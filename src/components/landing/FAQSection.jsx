import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'С какого класса можно заниматься?',
    a: 'Занятия подходят для учеников с 8 по 11 класс, а также для студентов и взрослых, которые хотят изучить или освежить знания по химии.',
  },
  {
    q: 'Подходит ли курс для подготовки к ОГЭ?',
    a: 'Да, есть специальная программа подготовки к ОГЭ. Проходим все типы заданий, отрабатываем на реальных вариантах.',
  },
  {
    q: 'Подходит ли курс для подготовки к ЕГЭ?',
    a: 'Конечно! Подготовка к ЕГЭ — основное направление. Средний балл учеников составляет 70–72, что на 20 баллов выше среднего по стране.',
  },
  {
    q: 'Чем отличаются тарифы?',
    a: 'Курс без сопровождения — самостоятельное изучение. Курс с проверкой — добавляется проверка домашних заданий. Индивидуальные занятия — персональная работа один на один. Полный курс — всё вместе + 4 часа личных занятий. Групповые — до 5 человек.',
  },
  {
    q: 'Как проходят занятия?',
    a: 'Занятия проходят онлайн (дистанционно) или очно в Москве. Длительность — 60 минут. Используем интерактивные материалы, разбираем задания и решаем задачи.',
  },
  {
    q: 'Как записаться на занятия?',
    a: 'Заполните форму на сайте или напишите в Telegram (@nomer33). Мы обсудим ваши цели и подберём подходящий формат.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Частые вопросы
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-xl border border-border px-6">
              <AccordionTrigger className="font-heading font-semibold text-foreground text-left py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}