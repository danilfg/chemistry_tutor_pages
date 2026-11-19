import React, { createContext, useContext } from 'react';

export const fallbackTexts = {
  'hero-student-title': 'Химия без паники и зубрежки',
  'hero-student-subtitle': 'Понятные объяснения, помощь со школьной программой и подготовка к экзаменам. С опытным преподавателем всё получится!',
  'hero-student-cta': 'Хочу разобраться',
  'hero-parent-title': 'Системная подготовка по химии без стресса',
  'hero-parent-subtitle': 'Помогаю ученикам разобраться в сложных темах и подготовиться к ЕГЭ, ОГЭ и ДВИ. Средний балл учеников на 20 баллов выше среднего по стране.',
  'hero-parent-cta': 'Записать ребёнка',
  'about-student-text': 'Готовлю к ЕГЭ, ОГЭ и ДВИ в МГУ. Химия для меня — не просто работа, а интерес, которым стараюсь делиться. Общаюсь с учениками как со взрослыми людьми, заинтересованными в результате. Мой средний балл ЕГЭ — 70–72, что на 20 баллов выше среднего по стране.',
  'about-parent-text': 'Готовлю учеников к ЕГЭ, ОГЭ и ДВИ в МГУ, а также к англоязычным экзаменам и программам по химии. Средний балл ЕГЭ у моих учеников — 70–72 балла, что на 20 баллов выше среднего по стране. Предоставляю подробный отчёт о прогрессе раз в 2 месяца.',
  'contact-student-title': 'Готов начать? Напиши!',
  'contact-student-subtitle': 'Демо интерфейса. Для связи перейди на основной сайт.',
  'contact-parent-title': 'Запишите ребёнка на занятия',
  'contact-parent-subtitle': 'Демо интерфейса. Актуальная информация находится на основном сайте.',
};

export const fallbackContacts = {};

export const fallbackTariffs = [
  {
    id: 'course-basic',
    name: 'Курс без сопровождения',
    price: '3 000',
    unit: '₽ / месяц',
    recommended: false,
    student: { desc: 'Учись сам в своём темпе — все материалы уже готовы', buttonText: 'Хочу этот вариант' },
    parent: { desc: 'Самостоятельное изучение по структурированной программе', buttonText: 'Выбрать тариф' },
    features: ['Доступ к материалам курса', 'Структурированная программа', 'Обучение в своём темпе'],
  },
  {
    id: 'course-homework',
    name: 'Курс + проверка ДЗ',
    price: '5 000',
    unit: '₽ / месяц',
    recommended: false,
    student: { desc: 'Материалы + проверю твою домашку и объясню ошибки', buttonText: 'Хочу этот вариант' },
    parent: { desc: 'Курс с проверкой домашних заданий и комментариями', buttonText: 'Выбрать тариф' },
    features: ['Полный курс материалов', 'Проверка домашнего задания', 'Комментарии по ошибкам', 'Помощь в понимании тем'],
  },
  {
    id: 'individual',
    name: 'Индивидуальные занятия',
    price: '2 600',
    unit: '₽ / час',
    recommended: false,
    student: { desc: 'Персональные занятия — разберём именно то, что тебе нужно', buttonText: 'Хочу этот вариант' },
    parent: { desc: 'Персональные занятия для разбора тем и подготовки к экзаменам', buttonText: 'Выбрать тариф' },
    features: ['Разбор сложных тем', 'Подготовка к контрольным', 'Подготовка к ЕГЭ/ОГЭ', 'Индивидуальная программа'],
  },
  {
    id: 'full-package',
    name: 'Полный курс',
    price: '12 500',
    unit: '₽ / месяц',
    recommended: true,
    student: { desc: 'Максимальная поддержка: курс + домашка + 4 часа индивидуальных занятий', buttonText: 'Хочу этот вариант' },
    parent: { desc: 'Комплексная подготовка: курс, проверка ДЗ и 4 часа индивидуальных занятий', buttonText: 'Выбрать тариф' },
    features: ['Полный курс материалов', 'Проверка домашнего задания', 'Помощь по сложным темам', '4 часа индивидуальных занятий'],
  },
  {
    id: 'group',
    name: 'Групповые занятия',
    price: '1 500',
    unit: '₽ / час',
    recommended: false,
    student: { desc: 'Учись в компании — решайте задачи вместе, это дешевле и веселее', buttonText: 'Хочу этот вариант' },
    parent: { desc: 'Доступный формат в мини-группе до 5 человек', buttonText: 'Выбрать тариф' },
    features: ['Группа до 5 человек', 'Доступная цена', 'Групповая динамика', 'Совместное решение задач'],
  },
];

const ContentContext = createContext({
  texts: fallbackTexts,
  contacts: fallbackContacts,
  tariffs: fallbackTariffs,
});

export function ContentProvider({ children }) {
  return (
    <ContentContext.Provider value={{ texts: fallbackTexts, contacts: fallbackContacts, tariffs: fallbackTariffs }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
