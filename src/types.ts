export type Language = 'en' | 'hy' | 'ru';
export type L10n = Record<Language, string>;

export interface Course {
  id: string;
  badge: L10n;
  title: L10n;
  description: L10n;
  duration: L10n;
  intensity: L10n;
  groupSize: L10n;
  price: number; // AMD
  priceUnit: 'month' | 'package';
  features: { en: string[]; hy: string[]; ru: string[] };
  popular?: boolean;
}

export interface Teacher {
  id: string;
  name: L10n;
  role: L10n;
  experience: L10n;
  credentials: string[];
  bio: L10n;
}

export interface Testimonial {
  id: string;
  name: string;
  course: L10n;
  result: L10n;
  quote: L10n;
  rating: number;
}

export interface FaqItem {
  question: L10n;
  answer: L10n;
}

export interface TestQuestion {
  question: L10n;
  options: {
    text: L10n;
    points: number;
  }[];
}
