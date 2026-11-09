import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations } from '../translations';
import { coursesData, teachersData, testimonialsData, faqData, diagnosticTestQuestions, defaultImages } from '../data';
import { PRICES, CONTACT } from '../config';
import type { Course, Teacher, Testimonial, FaqItem, TestQuestion, Language } from '../types';

export type Texts = typeof translations;

export interface SiteContent {
  texts: Texts;
  /** Загруженные админом фото: слот -> адрес или Data URL. Если слота нет — используется стандартное фото. */
  images: Record<string, string>;
  courses: Course[];
  teachers: Teacher[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  questions: TestQuestion[];
  prices: {
    individual: { price: number; lessons: number };
    calculator: { group: number; intensive: number; individual: number };
    discounts: Record<number, number>;
  };
  contact: typeof CONTACT;
}

const STORAGE_KEY = 'nextlevel_cms_content_v1';

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

export const defaultContent: SiteContent = clone({
  texts: translations,
  images: {} as Record<string, string>,
  courses: coursesData,
  teachers: teachersData,
  testimonials: testimonialsData,
  faq: faqData,
  questions: diagnosticTestQuestions,
  prices: { individual: PRICES.individual, calculator: PRICES.calculator, discounts: PRICES.discounts },
  contact: CONTACT,
});

/** Сливает сохранённые правки со стандартным контентом (новые стандартные поля не теряются). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(base: any, saved: any): any {
  if (saved === undefined || saved === null) return base;
  if (Array.isArray(base)) return Array.isArray(saved) ? saved : base;
  if (base && typeof base === 'object') {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(base)) out[k] = deepMerge(base[k], saved[k]);
    return out;
  }
  return typeof saved === typeof base ? saved : base;
}

export function mergeContent(saved: Partial<SiteContent> | null | undefined): SiteContent {
  const d = clone(defaultContent);
  if (!saved || typeof saved !== 'object') return d;
  return {
    texts: deepMerge(d.texts, saved.texts),
    images: { ...(saved.images ?? {}) },
    courses: Array.isArray(saved.courses) && saved.courses.length > 0 ? saved.courses : d.courses,
    teachers: Array.isArray(saved.teachers) && saved.teachers.length > 0 ? saved.teachers : d.teachers,
    testimonials: Array.isArray(saved.testimonials) && saved.testimonials.length > 0 ? saved.testimonials : d.testimonials,
    faq: Array.isArray(saved.faq) && saved.faq.length > 0 ? saved.faq : d.faq,
    questions: Array.isArray(saved.questions) && saved.questions.length > 0 ? saved.questions : d.questions,
    prices: deepMerge(d.prices, saved.prices),
    contact: deepMerge(d.contact, saved.contact),
  };
}

function loadFromLocalStorage(): Partial<SiteContent> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToLocalStorage(c: SiteContent | null) {
  try {
    if (!c) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    }
  } catch {
    // ignore quota errors
  }
}

/** Сжимает изображение через Canvas, чтобы оно мгновенно работало и на сервере, и в демо-файле */
export async function compressImageFile(file: File, keepTransparency = false, maxDim = 1100): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.onload = () => {
      const imgEl = new Image();
      imgEl.onerror = () => reject(new Error('Некорректный формат изображения'));
      imgEl.onload = () => {
        let { width, height } = imgEl;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(imgEl, 0, 0, width, height);
        const isPng = keepTransparency || file.type === 'image/png' || file.type === 'image/webp';
        const dataUrl = isPng
          ? canvas.toDataURL('image/png')
          : canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      imgEl.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

interface Ctx {
  content: SiteContent;
  /** true, если сервер (api.php) ответил — значит админка синхронизирует изменения с сервером */
  serverAvailable: boolean;
  reload: () => Promise<void>;
  saveContent: (newContent: SiteContent, password?: string) => Promise<{ ok: boolean; mode: 'server' | 'browser'; error?: string }>;
  resetContent: (password?: string) => Promise<{ ok: boolean; error?: string }>;
  uploadImage: (slot: string, file: File, password?: string) => Promise<string>;
  img: (slot: string) => string;
  defaultImages: Record<string, string>;
}

const ContentContext = createContext<Ctx | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => mergeContent(loadFromLocalStorage()));
  const [serverAvailable, setServerAvailable] = useState(false);

  const reload = useCallback(async () => {
    try {
      const res = await fetch('api.php?action=get', { cache: 'no-store' });
      const type = res.headers.get('content-type') ?? '';
      if (!res.ok || !type.includes('json')) return;
      const data = await res.json();
      setServerAvailable(true);
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        const merged = mergeContent(data);
        setContent(merged);
        saveToLocalStorage(merged);
      }
    } catch {
      /* нет сервера (например, демо-файл открыт напрямую) — используем localStorage и стандартные данные */
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const saveContent = useCallback(
    async (newContent: SiteContent, password = ''): Promise<{ ok: boolean; mode: 'server' | 'browser'; error?: string }> => {
      const merged = mergeContent(newContent);
      setContent(merged);
      saveToLocalStorage(merged);

      if (serverAvailable) {
        try {
          const res = await fetch('api.php?action=save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Admin-Password': password,
            },
            body: JSON.stringify({ password, content: merged }),
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok || data.ok === false) {
            return { ok: false, mode: 'server', error: data.error || 'Ошибка сохранения на сервере' };
          }
          return { ok: true, mode: 'server' };
        } catch {
          return { ok: true, mode: 'browser' };
        }
      }
      return { ok: true, mode: 'browser' };
    },
    [serverAvailable],
  );

  const resetContent = useCallback(
    async (password = ''): Promise<{ ok: boolean; error?: string }> => {
      const fresh = clone(defaultContent);
      setContent(fresh);
      saveToLocalStorage(null);
      if (serverAvailable) {
        try {
          const res = await fetch('api.php?action=save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Admin-Password': password,
            },
            body: JSON.stringify({ password, content: {} }),
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok || data.ok === false) {
            return { ok: false, error: data.error || 'Ошибка сброса на сервере' };
          }
        } catch {
          // ignore
        }
      }
      return { ok: true };
    },
    [serverAvailable],
  );

  const uploadImage = useCallback(
    async (slot: string, file: File, password = ''): Promise<string> => {
      if (serverAvailable) {
        try {
          const fd = new FormData();
          fd.append('file', file);
          fd.append('slot', slot);
          fd.append('password', password);
          const res = await fetch('api.php?action=upload', {
            method: 'POST',
            headers: { 'X-Admin-Password': password },
            body: fd,
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.ok && data.url) {
            return String(data.url);
          }
        } catch {
          // fallback to compressed data URL
        }
      }
      const keepAlpha = slot === 'logo' || slot === 'logoWhite';
      return compressImageFile(file, keepAlpha, keepAlpha ? 600 : 1100);
    },
    [serverAvailable],
  );

  const value = useMemo<Ctx>(
    () => ({
      content,
      serverAvailable,
      reload,
      saveContent,
      resetContent,
      uploadImage,
      img: (slot: string) => content.images[slot] || defaultImages[slot] || '',
      defaultImages,
    }),
    [content, serverAvailable, reload, saveContent, resetContent, uploadImage],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): Ctx => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
};

export const useT = (lang: Language) => useContent().content.texts[lang];
