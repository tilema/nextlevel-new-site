import type { Course, Teacher, Testimonial, TestQuestion, FaqItem } from './types';
import { PRICES } from './config';
import imgTalk from './assets/photos/students-talk.jpg';
import imgFriends from './assets/photos/friends-study.jpg';
import imgHero from './assets/photos/hero-students.jpg';
import imgMeeting from './assets/old/image1.jpg';
import imgLibrary from './assets/old/banner.jpg';
import imgTutor from './assets/photos/tutor.jpg';
import imgBuilding from './assets/photos/building.jpg';
import imgLogo from './assets/brand/logo.png';
import imgLogoWhite from './assets/brand/logo-white.png';
import imgT1 from './assets/photos/teacher-1.jpg';
import imgT2 from './assets/photos/teacher-2.jpg';
import imgT3 from './assets/photos/teacher-3.jpg';
import imgA from './assets/photos/student-a.jpg';
import imgB from './assets/photos/student-b.jpg';
import imgC from './assets/photos/student-c.jpg';


const rawCourses: Omit<Course, 'price' | 'priceUnit'>[] = [
  {
    id: 'ielts-mastery',
    popular: true,
    badge: { en: 'Top Rated', hy: 'Ամենապահանջված', ru: 'Хит сезона' },
    title: {
      en: 'IELTS Academic & General Prep',
      hy: 'IELTS Academic և General Նախապատրաստում',
      ru: 'Подготовка к IELTS (Academic & General)',
    },
    description: {
      en: 'Intensive preparation targeting Band 7.0–8.5. Includes full mock exams under timed conditions, authentic Cambridge materials, and in-depth Writing & Speaking feedback.',
      hy: 'Ինտենսիվ դասընթաց՝ ուղղված 7.0–8.5 միավորին: Ներառում է իրական փորձնական քննություններ, Cambridge նյութեր և Writing ու Speaking-ի մանրամասն վերլուծություն:',
      ru: 'Интенсивный курс для достижения Band 7.0–8.5. Включает полные пробные экзамены с таймером, материалы Cambridge и детальный разбор секций Writing и Speaking.',
    },
    duration: { en: '12 weeks', hy: '12 շաբաթ', ru: '12 недель' },
    intensity: { en: '3 times / week (2 hrs)', hy: 'Շաբաթական 3 անգամ (2 ժամ)', ru: '3 раза в неделю (2 ч)' },
    groupSize: { en: 'Max 6 students', hy: 'Առավելագույնը 6 ուսանող', ru: 'До 6 человек' },
    features: {
      en: [
        'Weekly full-length timed Mock Exams',
        'Direct scoring analysis by IELTS 8.5+ trainers',
        'Over 100+ essay writing corrections with feedback',
        'Free speaking club access on weekends',
      ],
      hy: [
        'Շաբաթական իրական Mock քննություններ',
        'Անհատական վերլուծություն 8.5+ ունեցող մասնագետներից',
        'Ավելի քան 100 էսսեների ստուգում և ուղղում',
        'Անվճար մասնակցություն Speaking ակումբներին',
      ],
      ru: [
        'Еженедельные полные Mock-тесты в условиях реального экзамена',
        'Разбор стратегий преподавателями с личным баллом 8.5+',
        'Проверка более 100 эссе с детальными комментариями',
        'Бесплатные субботние разговорные клубы с носителями',
      ],
    },
  },
  {
    id: 'general-english',
    badge: { en: 'Core Program', hy: 'Հիմնական', ru: 'Базовый курс' },
    title: {
      en: 'General English (A1 to C1)',
      hy: 'Ընդհանուր Անգլերեն (A1 - C1)',
      ru: 'Общий курс английского (A1 – C1)',
    },
    description: {
      en: 'Master speaking, grammar, and listening with our communicative Oxford-based method. Focus on real-life conversations from Day 1 to eliminate fear of speaking.',
      hy: 'Յուրացրեք խոսակցականը, քերականությունը և լսելը Օքսֆորդի հաղորդակցական մեթոդով: Շեշտը դրվում է կենդանի երկխոսությունների վրա՝ առաջին իսկ դասից:',
      ru: 'Освойте разговорную речь, грамматику и восприятие на слух по коммуникативной методике Oxford. Фокус на живой речи с первого дня без зубрежки.',
    },
    duration: { en: '3–6 months per level', hy: '3–6 ամիս յուր. մակարդակի համար', ru: '3–6 месяцев на уровень' },
    intensity: { en: '3 times / week (1.5 hrs)', hy: 'Շաբաթական 3 անգամ (1.5 ժամ)', ru: '3 раза в неделю (1.5 ч)' },
    groupSize: { en: '4–8 students', hy: '4–8 ուսանող', ru: '4–8 человек' },
    features: {
      en: [
        'Interactive vocabulary building & idioms',
        'Grammar explained through spoken practice',
        'Listening comprehension with audio dialogues',
        'Certificate upon level completion',
      ],
      hy: [
        'Ակտիվ բառապաշարի և դարձվածքների յուրացում',
        'Քերականության պարզաբանում խոսքի միջոցով',
        'Լսողական հմտությունների զարգացում',
        'Պաշտոնական ավարտական հավաստագիր',
      ],
      ru: [
        'Интерактивное расширение словарного запаса и идиом',
        'Понятная грамматика сразу через разговорную практику',
        'Развитие аудирования на реальных диалогах и подкастах',
        'Сертификат при переходе на следующий уровень',
      ],
    },
  },
  {
    id: 'speaking-club-fluency',
    badge: { en: 'High Immersion', hy: 'Խոսակցական', ru: 'Разговорный' },
    title: {
      en: 'Fluency & Conversational Intensive',
      hy: 'Խոսակցական Ինտենսիվ և Բանավեճեր',
      ru: 'Разговорный интенсив & Speaking Club',
    },
    description: {
      en: 'Overcome the hesitation barrier! Dynamic discussions on psychology, cinema, technology, debate tournaments, and real-world everyday topics.',
      hy: 'Հաղթահարեք խոսելու վախը: Քննարկումներ հոգեբանության, կինոյի, տեխնոլոգիաների շուրջ, բանավեճեր և կենդանի շփում:',
      ru: 'Сломайте языковой барьер навсегда! Горячие дебаты, разбор кино, психология, технологии и моделирование жизненных ситуаций.',
    },
    duration: { en: 'Ongoing / Monthly', hy: 'Ամսական / Շարունակական', ru: 'Ежемесячный абонемент' },
    intensity: { en: '2 times / week (2 hrs)', hy: 'Շաբաթական 2 անգամ (2 ժամ)', ru: '2 раза в неделю (2 ч)' },
    groupSize: { en: '6–8 students', hy: '6–8 ուսանող', ru: '6–8 человек' },
    features: {
      en: [
        'Native speaker guest hosts',
        'Pronunciation & accent reduction coaching',
        'Debate workshops and speech delivery',
        'Relaxed atmosphere with coffee & tea included',
      ],
      hy: [
        'Հրավիրյալ բնիկ խոսնակներ (Native speakers)',
        'Արտասանության և առոգանության շտկում',
        'Հռետորական հմտությունների զարգացում',
        'Ընկերական մթնոլորտ՝ սուրճով և թեյով',
      ],
      ru: [
        'Ведущие — носители языка и сертифицированные тренеры',
        'Постановка британского/американского произношения',
        'Развитие навыков публичных выступлений и аргументации',
        'Уютная клубная атмосфера с кофе и чаем',
      ],
    },
  },
  {
    id: 'business-it-english',
    badge: { en: 'Career Boost', hy: 'Կարիերայի համար', ru: 'Для карьеры' },
    title: {
      en: 'Business & IT English',
      hy: 'Բիզնես և IT Անգլերեն',
      ru: 'Деловой и IT английский',
    },
    description: {
      en: 'Tailored for tech professionals, managers, and entrepreneurs. Job interview prep, pitching to international investors, business email correspondence, and standup meetings.',
      hy: 'Նախատեսված է IT ոլորտի մասնագետների, մենեջերների և գործարարների համար: Հարցազրույցների նախապատրաստում, բիզնես նամակագրություն և բանակցություններ:',
      ru: 'Специализированный курс для IT-специалистов, продактов и предпринимателей. Подготовка к собеседованиям в международные компании, питчинг и переписка.',
    },
    duration: { en: '8 weeks', hy: '8 շաբաթ', ru: '8 недель' },
    intensity: { en: '2 times / week (2 hrs)', hy: 'Շաբաթական 2 անգամ (2 ժամ)', ru: '2 раза в неделю (2 ч)' },
    groupSize: { en: '4–6 professionals', hy: '4–6 մասնագետ', ru: '4–6 специалистов' },
    features: {
      en: [
        'Mock FAANG / European tech job interviews',
        'Presentation decks and slide pitching drills',
        'Professional negotiation vocabulary',
        'LinkedIn profile & English resume review',
      ],
      hy: [
        'Միջազգային IT հարցազրույցների սիմուլյացիա',
        'Պրեզենտացիաների և փիչինգի հմտություններ',
        'Գործարար բանակցությունների բառապաշար',
        'LinkedIn պրոֆիլի և ռեզյումեի խմբագրում',
      ],
      ru: [
        'Симуляция собеседований в зарубежные IT-компании',
        'Отработка презентаций и питчей проектов на английском',
        'Лексика для созвонов, переговоров и переписки с клиентами',
        'Проверка резюме (CV) и оформление профиля LinkedIn',
      ],
    },
  },
  {
    id: 'toefl-ibt',
    badge: { en: 'University Admissions', hy: 'ԲՈՒՀ ընդունվելու համար', ru: 'Для вузов' },
    title: {
      en: 'TOEFL iBT Academic Preparation',
      hy: 'TOEFL iBT Քննության Նախապատրաստում',
      ru: 'Подготовка к TOEFL iBT Academic',
    },
    description: {
      en: 'Target scores 100+ for US and international colleges. In-depth computer-based test strategies, integrated speaking/listening tasks, and note-taking mechanics.',
      hy: '100+ միավոր ԱՄՆ և միջազգային համալսարանների համար: Համակարգչային թեստերի ռազմավարություն, ինտեգրված առաջադրանքների կատարում:',
      ru: 'Курс на результат 100+ баллов для поступления в США и Европу. Тактики работы за компьютером, шаблоны для Integrated Writing и Speaking.',
    },
    duration: { en: '10 weeks', hy: '10 շաբաթ', ru: '10 недель' },
    intensity: { en: '3 times / week (2 hrs)', hy: 'Շաբաթական 3 անգամ (2 ժամ)', ru: '3 раза в неделю (2 ч)' },
    groupSize: { en: 'Max 6 students', hy: 'Առավելագույնը 6 ուսանող', ru: 'До 6 человек' },
    features: {
      en: [
        'Official ETS licensed practice questions',
        'Note-taking shorthand mastery',
        'Speaking template drills under 45-60s limit',
        'High-speed Academic reading techniques',
      ],
      hy: [
        'ETS պաշտոնական նյութեր և թեստեր',
        'Արագ նոթագրման (note-taking) տեխնիկա',
        'Խոսքի ձևանմուշների ավտոմատացում (Speaking templates)',
        'Ակադեմիական արագ ընթերցանության մեթոդներ',
      ],
      ru: [
        'Лицензионные задания от разработчика ETS',
        'Техника быстрого конспектирования лекций на слух',
        'Шаблоны для секции Speaking с таймером в 45-60 секунд',
        'Скорочтение для академических текстов секции Reading',
      ],
    },
  },
  {
    id: 'vip-individual',
    badge: { en: 'Maximum Flexibility', hy: 'Անհատական', ru: 'VIP Обучение' },
    title: {
      en: '1-on-1 Personalized Mentorship',
      hy: 'Անհատական 1-on-1 Պարապմունքներ',
      ru: 'Индивидуальные занятия с топ-преподавателем',
    },
    description: {
      en: '100% focused on your goals and timeline. Choose your schedule, customize topics, and progress 2.5x faster with undivided expert attention.',
      hy: '100% կենտրոնացում Ձեր նպատակների և ժամանակացույցի վրա: Կարգավորելի գրաֆիկ, անհատական ծրագիր և 2.5 անգամ ավելի արագ առաջընթաց:',
      ru: 'Программа адаптируется под ваш график и задачи на 100%. Выбирайте удобные дни и часы, учитесь в 2.5 раза быстрее с личным наставником.',
    },
    duration: { en: 'Flexible', hy: 'Ճկուն', ru: 'Гибкий график' },
    intensity: { en: 'Customizable (2–5x / week)', hy: 'Ընտրովի (շաբաթական 2–5 անգամ)', ru: 'Индивидуально (2–5 раз в нед.)' },
    groupSize: { en: '1-on-1 Private', hy: 'Անհատական', ru: '1-на-1 с преподавателем' },
    features: {
      en: [
        'Complete flexibility to reschedule with 4h notice',
        'Customized curriculum based on your domain',
        'Audio recordings of lessons for spaced repetition',
        'Direct 24/7 WhatsApp mentor support',
      ],
      hy: [
        'Դասը տեղափոխելու հնարավորություն (4 ժամ առաջ)',
        'Ծրագիր՝ հարմարեցված Ձեր մասնագիտությանը',
        'Դասերի աուդիո ձայնագրություններ կրկնության համար',
        '24/7 կապ անձնական դասախոսի հետ WhatsApp-ում',
      ],
      ru: [
        'Возможность переноса занятий с уведомлением за 4 часа',
        'Индивидуальный план под вашу профессию или цель',
        'Записи аудиоуроков для повторения лексики',
        'Прямая связь с наставником в мессенджере',
      ],
    },
  },
];

export const coursesData: Course[] = rawCourses.map((c) => ({
  ...c,
  price: c.id === 'vip-individual' ? PRICES.individual.price : PRICES.courses[c.id] ?? 0,
  priceUnit: c.id === 'vip-individual' ? 'package' : 'month',
}));

export const teachersData: Teacher[] = [
  {
    id: 'anahit-s',
    name: { en: 'Anahit Sargsyan', hy: 'Անահիտ Սարգսյան', ru: 'Анаит Саргсян' },
    role: {
      en: 'Lead IELTS Trainer & Academic Director',
      hy: 'IELTS առաջատար դասախոս և ուսումնական ղեկավար',
      ru: 'Ведущий тренер IELTS и академический руководитель',
    },
    experience: { en: '10+ years', hy: '10+ տարի', ru: '10+ лет' },
    credentials: ['CELTA (Cambridge)', 'IELTS 8.5 Academic', 'MA Applied Linguistics'],
    bio: {
      en: 'Has trained over 600 students with an average IELTS score of 7.5. Specializes in advanced Writing Task 2 structure and fluency coherence.',
      hy: 'Պատրաստել է 600-ից ավելի ուսանողների՝ 7.5 միջին IELTS արդյունքով: Մասնագիտացած է Writing Task 2-ի և սահուն խոսքի զարգացման մեջ:',
      ru: 'Подготовила более 600 студентов со средним баллом IELTS 7.5. Эксперт по структуре Writing Task 2 и преодолению скованности в речи.',
    },
  },
  {
    id: 'david-m',
    name: { en: 'David Miller', hy: 'Դեյվիդ Միլլեր', ru: 'Дэвид Миллер' },
    role: {
      en: 'Native Speaker & Pronunciation Coach',
      hy: 'Բնիկ անգլիախոս դասախոս և արտասանության մարզիչ',
      ru: 'Преподаватель-носитель языка (Великобритания) & Коуч по речи',
    },
    experience: { en: '8 years', hy: '8 տարի', ru: '8 лет' },
    credentials: ['TEFL Certified (UK)', 'Oxford Pronunciation Specialist', 'BA Literature'],
    bio: {
      en: 'Born and educated in Manchester, UK. Specializes in accent neutralization, natural British intonation, and high-energy debate sessions.',
      hy: 'Ծնվել և կրթություն է ստացել Մանչեսթերում (ՄԹ): Մասնագիտացած է արտասանության հղկման և բանավեճերի անցկացման մեջ:',
      ru: 'Родился и вырос в Манчестере. Помогает избавиться от акцента, поставить естественную интонацию и уверенно выступать на дебатах.',
    },
  },
  {
    id: 'ani-h',
    name: { en: 'Ani Harutyunyan', hy: 'Անի Հարությունյան', ru: 'Ани Арутюнян' },
    role: {
      en: 'General & Business English Expert',
      hy: 'Ընդհանուր և Բիզնես անգլերենի փորձագետ',
      ru: 'Эксперт по общему и деловому английскому',
    },
    experience: { en: '7 years', hy: '7 տարի', ru: '7 лет' },
    credentials: ['TKT (Cambridge)', 'Business English Certificate', 'YSU Honors Graduate'],
    bio: {
      en: 'Helps IT engineers and professionals pass international job interviews and confidently lead client calls without mental translating.',
      hy: 'Օգնում է IT մասնագետներին հաջողությամբ անցնել միջազգային հարցազրույցները և վարել գործնական բանակցություններ:',
      ru: 'Помогает IT-специалистам проходить собеседования в международные компании и свободно общаться с заказчиками без внутреннего перевода.',
    },
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Gor Manukyan',
    course: { en: 'IELTS Intensive', hy: 'IELTS Ինտենսիվ', ru: 'IELTS Интенсив' },
    result: { en: 'IELTS Band 8.0 · AUA admission', hy: 'IELTS 8.0 · ընդունվել է ՀԱՀ', ru: 'IELTS 8.0 · поступил в AUA' },
    quote: {
      en: 'Before Next Level I was stuck at 6.5 in Writing. In just 2 months with Anahit, I mastered the paragraph structure and got an 8.0 overall. Truly the best school in Yerevan!',
      hy: 'Նախքան Next Level-ը ես չէի կարողանում հաղթահարել 6.5-ի շեմը Writing-ում: Ընդամենը 2 ամսում ստացա ընդհանուր 8.0 միավոր և ընդունվեցի ՀԱՀ (AUA): Հիանալի թիմ է:',
      ru: 'До Next Level у меня был затык на 6.5 в секции Writing. За 2 месяца занятий с Анаит я четко понял логику критериев и получил 8.0 overall! Поступил в AUA.',
    },
    rating: 5,
  },
  {
    id: '2',
    name: 'Lilit Poghosyan',
    course: { en: 'General English (B1 to B2)', hy: 'Ընդհանուր Անգլերեն', ru: 'Общий курс B1 -> B2' },
    result: { en: 'Overcame the speaking barrier', hy: 'Հաղթահարել է խոսելու վախը', ru: 'Сняла языковой барьер' },
    quote: {
      en: 'I knew grammar rules in theory, but when speaking I would freeze. The small group dynamic and weekend speaking clubs gave me genuine confidence. Now I easily communicate on trips!',
      hy: 'Քերականությունը լավ գիտեի, բայց խոսելիս լարվում էի: Փոքր խմբերն ու շաբաթ օրերի Speaking ակումբները ինձ լիարժեք վստահություն տվեցին:',
      ru: 'Грамматику я знала, но при попытке заговорить впадала в ступор. Маленькая группа и субботние спикинг-клабы полностью сняли страх. Теперь свободно общаюсь в поездках!',
    },
    rating: 5,
  },
  {
    id: '3',
    name: 'Armen Gasparyan',
    course: { en: 'Business & IT English', hy: 'IT Անգլերեն', ru: 'Деловой & IT английский' },
    result: { en: 'Hired by an EU tech company', hy: 'Աշխատանքի ընդունվեց ԵՄ IT ընկերություն', ru: 'Оффер от европейской IT-компании' },
    quote: {
      en: 'Practiced mock interviews with Ani and David. They corrected my tech terminology and delivery. Two weeks later I received an offer from a German startup!',
      hy: 'Անիի և Դեյվիդի հետ պատրաստվեցի հարցազրույցների, շտկեցինք IT տերմինաբանությունս: Երկու շաբաթ անց ես ստացա աշխատանքի առաջարկ գերմանական ընկերությունից:',
      ru: 'Отработал технические интервью с Ани и Дэвидом. Они скорректировали подачу и лексику. Через 2 недели я получил оффер от европейской компании!',
    },
    rating: 5,
  },
];

export const faqData: FaqItem[] = [
  {
    question: {
      en: 'What happens during the Free Trial Lesson?',
      hy: 'Ի՞նչ է տեղի ունենում անվճար փորձնական դասի ընթացքում:',
      ru: 'Как проходит бесплатный пробный урок?',
    },
    answer: {
      en: 'During the 40-minute trial session, you will meet your instructor, take a verbal assessment, experience our teaching style first-hand, and receive a personalized roadmap with recommended materials.',
      hy: '40 րոպե տևողությամբ փորձնական դասի ընթացքում Դուք կծանոթանաք ուսուցչի հետ, կստուգեք խոսակցական մակարդակը և կստանաք Ձեզ համապատասխան ուսումնական ծրագիր:',
      ru: 'На 40-минутном пробном уроке вы познакомитесь с преподавателем, пройдете устное тестирование, оцените методику и получите персональный план обучения. Это ни к чему вас не обязывает.',
    },
  },
  {
    question: {
      en: 'Can I combine in-person classes in Yerevan with online lessons?',
      hy: 'Կարո՞ղ եմ համատեղել առկա դասերը Երևանում օնլայն ձևաչափի հետ:',
      ru: 'Можно ли совмещать очные занятия в Ереване с онлайн-уроками?',
    },
    answer: {
      en: 'Yes! Our campus on Abovyan 16/3 is fully synchronized with our online learning platform. If you are traveling or cannot come to class, you can join your regular group via Zoom without missing a beat.',
      hy: 'Այո՛: Եթե քաղաքից բացակայում եք կամ չեք կարողանում հաճախել, կարող եք միանալ Ձեր խմբին օնլայն՝ Zoom-ի միջոցով:',
      ru: 'Да! Наша школа на ул. Абовяна 16/3 оборудована для гибридного формата. Если вы в разъездах или заболели, вы можете подключиться к своей группе онлайн через Zoom.',
    },
  },
  {
    question: {
      en: 'What is the IELTS/TOEFL score guarantee policy?',
      hy: 'Ի՞նչ է նշանակում IELTS/TOEFL քննությունների արդյունքի երաշխիքը:',
      ru: 'Как работает гарантия результата на экзаменах IELTS и TOEFL?',
    },
    answer: {
      en: 'If you attend at least 90% of our 12-week preparation classes, complete assigned mock tests, and do not reach your mutually agreed target score, you can re-attend the preparation module free of charge.',
      hy: 'Եթե հաճախել եք 12-շաբաթյա դասընթացի դասերի առնվազն 90%-ին և չեք հասել նպատակային միավորին, դասընթացը կրկնում եք անվճար:',
      ru: 'Если вы посетили более 90% занятий 12-недельного курса, выполняли домашние задания и пробные тесты, но не добрали согласованный балл, мы предоставляем повторный модуль обучения бесплатно.',
    },
  },
  {
    question: {
      en: 'What if I need to freeze my subscription or miss a class?',
      hy: 'Ի՞նչ անել, եթե ցանկանում եմ սառեցնել աբոնեմենտը կամ բաց եմ թողել դասը:',
      ru: 'Можно ли заморозить абонемент или отработать пропущенный урок?',
    },
    answer: {
      en: 'Every student can freeze their subscription for up to 14 days per 3-month cycle. Missed group lessons can be reviewed via class summaries, teacher notes, or worked through at weekend revision sessions.',
      hy: 'Յուրաքանչյուր ուսանող կարող է սառեցնել աբոնեմենտը մինչև 14 օր: Բաց թողնված նյութը կարող եք լրացնել լրացուցիչ խորհրդատվության ժամանակ:',
      ru: 'Каждый студент может бесплатно заморозить абонемент на срок до 14 дней в рамках 3-месячного курса. Пропущенные материалы вы получаете в виде конспекта и можете разобрать на субботней консультации.',
    },
  },
  {
    question: {
      en: 'Do you provide an official Certificate of Completion?',
      hy: 'Տրամադրու՞մ եք ավարտական պաշտոնական հավաստագիր (Certificate):',
      ru: 'Выдаете ли вы официальный сертификат об окончании?',
    },
    answer: {
      en: 'Yes. Upon completing each level and passing the final exit test with 70%+ score, you receive an accredited Next Level Certificate detailing your CEFR level and academic hours.',
      hy: 'Այո՛: Յուրաքանչյուր մակարդակն ավարտելուց և ավարտական թեստը հաջողությամբ հանձնելուց հետո Դուք ստանում եք պաշտոնական Next Level սերտիֆիկատ:',
      ru: 'Да. После завершения уровня и сдачи итогового теста на 70%+ вы получаете официальный сертификат Next Level с указанием уровня по шкале CEFR и количества академических часов.',
    },
  },
];

export const diagnosticTestQuestions: TestQuestion[] = [
  {
    question: {
      en: 'Choose the correct form: "She ______ to work by subway every morning."',
      hy: 'Ընտրեք ճիշտ տարբերակը՝ "She ______ to work by subway every morning."',
      ru: 'Выберите правильную форму: "She ______ to work by subway every morning."',
    },
    options: [
      { text: { en: 'go', hy: 'go', ru: 'go' }, points: 1 },
      { text: { en: 'goes', hy: 'goes', ru: 'goes' }, points: 3 },
      { text: { en: 'is going', hy: 'is going', ru: 'is going' }, points: 1 },
      { text: { en: 'has go', hy: 'has go', ru: 'has go' }, points: 0 },
    ],
  },
  {
    question: {
      en: 'Choose the correct sentence:',
      hy: 'Ընտրեք ճիշտ նախադասությունը՝',
      ru: 'Выберите грамматически верное предложение:',
    },
    options: [
      { text: { en: 'If I will see him, I tell him.', hy: 'If I will see him, I tell him.', ru: 'If I will see him, I tell him.' }, points: 0 },
      { text: { en: 'If I see him, I will tell him.', hy: 'If I see him, I will tell him.', ru: 'If I see him, I will tell him.' }, points: 4 },
      { text: { en: 'If I saw him, I tell him.', hy: 'If I saw him, I tell him.', ru: 'If I saw him, I tell him.' }, points: 1 },
      { text: { en: 'If I seen him, I would told.', hy: 'If I seen him, I would told.', ru: 'If I seen him, I would told.' }, points: 0 },
    ],
  },
  {
    question: {
      en: '"By next summer, we ________ in Yerevan for five years."',
      hy: '"By next summer, we ________ in Yerevan for five years."',
      ru: '"By next summer, we ________ in Yerevan for five years."',
    },
    options: [
      { text: { en: 'will live', hy: 'will live', ru: 'will live' }, points: 1 },
      { text: { en: 'will have been living', hy: 'will have been living', ru: 'will have been living' }, points: 5 },
      { text: { en: 'have lived', hy: 'have lived', ru: 'have lived' }, points: 2 },
      { text: { en: 'are living', hy: 'are living', ru: 'are living' }, points: 1 },
    ],
  },
  {
    question: {
      en: 'Which idiom best means "to face a difficult situation with courage"?',
      hy: 'Ո՞ր դարձվածքն է նշանակում «դժվարությանը խիզախորեն դիմակայել»՝',
      ru: 'Какая идиома означает «мужественно встретить трудности / стиснуть зубы»?',
    },
    options: [
      { text: { en: 'Bite the bullet', hy: 'Bite the bullet', ru: 'Bite the bullet' }, points: 5 },
      { text: { en: 'Spill the beans', hy: 'Spill the beans', ru: 'Spill the beans' }, points: 1 },
      { text: { en: 'Break a leg', hy: 'Break a leg', ru: 'Break a leg' }, points: 1 },
      { text: { en: 'Under the weather', hy: 'Under the weather', ru: 'Under the weather' }, points: 1 },
    ],
  },
  {
    question: {
      en: 'Complete the sentence: "Hardly ________ the airport when the flight was announced."',
      hy: 'Լրացրեք նախադասությունը՝ "Hardly ________ the airport when the flight was announced."',
      ru: 'Завершите предложение: "Hardly ________ the airport when the flight was announced."',
    },
    options: [
      { text: { en: 'we had reached', hy: 'we had reached', ru: 'we had reached' }, points: 1 },
      { text: { en: 'had we reached', hy: 'had we reached', ru: 'had we reached' }, points: 5 },
      { text: { en: 'did we reached', hy: 'did we reached', ru: 'did we reached' }, points: 0 },
      { text: { en: 'we reach', hy: 'we reach', ru: 'we reach' }, points: 0 },
    ],
  },
];

/** Стандартные фото (слоты). Админка может заменить любой слот своим файлом. */
export const defaultImages: Record<string, string> = {
  hero: imgHero,
  building: imgBuilding,
  testBanner: imgFriends,
  logo: imgLogo,
  logoWhite: imgLogoWhite,
  'course:ielts-mastery': imgTalk,
  'course:general-english': imgFriends,
  'course:speaking-club-fluency': imgHero,
  'course:business-it-english': imgMeeting,
  'course:toefl-ibt': imgLibrary,
  'course:vip-individual': imgTutor,
  'teacher:anahit-s': imgT1,
  'teacher:david-m': imgT2,
  'teacher:ani-h': imgT3,
  'student:1': imgA,
  'student:2': imgB,
  'student:3': imgC,
};
