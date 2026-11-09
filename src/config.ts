/**
 * ============================================================
 *  NEXT LEVEL — НАСТРОЙКИ САЙТА (цены, контакты, ссылки)
 * ============================================================
 *  Чтобы поменять цену или контакт — измените значение ниже,
 *  сохраните файл (Ctrl+S). Сайт обновится сам.
 *  Цены указаны в драмах (AMD) за 1 месяц.
 *
 *  ВАЖНО: цены ниже — ПРИМЕРНЫЕ. Замените их на реальные.
 * ============================================================
 */

export const PRICES = {
  // Карточки курсов (цена за месяц, AMD)
  courses: {
    'ielts-mastery': 48000,
    'general-english': 38000,
    'speaking-club-fluency': 28000,
    'business-it-english': 55000,
    'toefl-ibt': 48000,
  } as Record<string, number>,

  // Индивидуальные занятия: цена за пакет из N уроков
  individual: { price: 65000, lessons: 8 },

  // Калькулятор стоимости (цена за месяц, AMD)
  calculator: {
    group: 38000,
    intensive: 52000,
    individual: 65000,
  },

  // Скидки за длительную оплату (0.10 = 10%)
  discounts: {
    1: 0,
    3: 0.1,
    6: 0.2,
  } as Record<number, number>,
};

export const CONTACT = {
  phone1: '+374 (41) 05-98-00',
  phone1Link: '+37441059800',
  phone2: '+374 (41) 05-98-02',
  phone2Link: '+37441059802',
  whatsapp: '37441059800', // только цифры, без +
  telegram: 'nextlevel_am', // имя без @ (замените на реальное)
  instagram: 'https://instagram.com/', // вставьте ссылку на ваш Instagram
  facebook: 'https://facebook.com/', // вставьте ссылку на Facebook
  email: 'info@nextlevel.am',
  mapLink: 'https://yandex.ru/maps/?text=Yerevan%20Abovyan%2016/3',
};

/** Форматирует цену: 38000 -> "38,000 AMD" */
export const formatAMD = (value: number) => `${value.toLocaleString('en-US')} AMD`;
