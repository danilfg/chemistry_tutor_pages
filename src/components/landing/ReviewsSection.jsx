import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Отзыв 1',
    detail: 'ЕГЭ, 11 класс',
    text: 'Обратилась с результатом пробников в 53 балла. За 4 месяца ЕГЭ написала на 93 балла. Всё благодаря профессионализму и умению индивидуально выстраивать программу подготовки.',
    result: '53 → 93 балла',
  },
  {
    name: 'Отзыв 2',
    detail: 'ОГЭ + ЕГЭ',
    text: 'Прошли путь в три года. Результат — пятёрка по ОГЭ и 99 баллов по ЕГЭ. Все занятия структурированы, максимальные знания для сдачи на максимальные баллы.',
    result: '99 баллов ЕГЭ',
  },
  {
    name: 'Отзыв 3',
    detail: 'ЕГЭ, 11 класс',
    text: 'В химии была абсолютный ноль. Наши усилия привели к 85 баллам на ЕГЭ. После занятий мне просто нравилась химия во всех её проявлениях!',
    result: '0 → 85 баллов',
  },
  {
    name: 'Отзыв 4',
    detail: 'ЕГЭ, 11 класс',
    text: 'Химию знал на почти нулевом уровне. За год вытянула с 20 баллов на 80. Очень опытный специалист. Однозначно рекомендую.',
    result: '20 → 80 баллов',
  },
  {
    name: 'Отзыв 5',
    detail: 'Общая химия',
    text: 'Очень профессиональный репетитор. Учебный материал разобран по полочкам, всё доступно и понятно. Особая методика позволяет выучить химию с нуля.',
    result: 'С нуля до уверенности',
  },
  {
    name: 'Отзыв 6',
    detail: 'Поступление в 33 года',
    text: 'Решила поступать в вуз в 33 года по предметам, которых в школе никогда не касалась. Подход преподавателя сделал своё дело — я поступила!',
    result: 'Поступила в ВУЗ!',
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Примеры отзывов
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground font-body">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span>5.0 · 30 оценок на Яндекс Услугах</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="font-body text-sm text-foreground leading-relaxed mb-4">{r.text}</p>
              <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-body font-semibold mb-4">
                {r.result}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-primary text-sm">{r.name[0]}</span>
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-foreground">{r.name}</div>
                  <div className="font-body text-xs text-muted-foreground">{r.detail}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://uslugi.yandex.ru/profile/ArseniyaPonomareva-147967"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-primary hover:underline"
          >
            Все отзывы на Яндекс Услугах →
          </a>
        </div>
      </div>
    </section>
  );
}