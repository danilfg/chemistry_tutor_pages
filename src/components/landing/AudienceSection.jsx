import React from 'react';
import { useMode } from './ModeContext';
import { BookOpen, GraduationCap, Target, TrendingUp, Brain, Users, Lightbulb, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';

const cards = {
  student: [
    { icon: BookOpen, title: '8–9 класс', desc: 'Разберёмся в школьной программе и заложим крепкую базу' },
    { icon: GraduationCap, title: '10–11 класс', desc: 'Углублённое изучение для поступления в вуз мечты' },
    { icon: Target, title: 'Подготовка к ОГЭ', desc: 'Пройдём все задания, научимся решать на максимум' },
    { icon: TrendingUp, title: 'Подготовка к ЕГЭ', desc: 'Средний балл учеников — 70–72, это реально!' },
    { icon: Brain, title: 'Повышение оценок', desc: 'Подтянем оценки и уберём пробелы в знаниях' },
    { icon: Puzzle, title: 'Сложные темы', desc: 'ОВР, органика, задачи — разберём то, что непонятно' },
    { icon: Lightbulb, title: 'Индивидуально', desc: 'Персональные занятия с разбором твоих ошибок' },
    { icon: Users, title: 'Мини-группы', desc: 'Учись с другими, решайте задачи вместе' },
  ],
  parent: [
    { icon: BookOpen, title: '8–9 класс', desc: 'Формирование прочной базы знаний для дальнейшего обучения' },
    { icon: GraduationCap, title: '10–11 класс', desc: 'Углублённая подготовка к поступлению в профильные вузы' },
    { icon: Target, title: 'Подготовка к ОГЭ', desc: 'Системная проработка всех заданий экзамена' },
    { icon: TrendingUp, title: 'Подготовка к ЕГЭ', desc: 'Проверенная методика: средний балл учеников 70–72' },
    { icon: Brain, title: 'Повышение успеваемости', desc: 'Устранение пробелов и повышение школьных оценок' },
    { icon: Puzzle, title: 'Разбор сложных тем', desc: 'Глубокая проработка проблемных разделов программы' },
    { icon: Lightbulb, title: 'Индивидуальная помощь', desc: 'Персонализированная программа под задачи ученика' },
    { icon: Users, title: 'Мини-группы', desc: 'Эффективный формат с групповой динамикой и контролем' },
  ],
};

export default function AudienceSection() {
  const { mode } = useMode();
  const items = cards[mode];

  return (
    <section id="audience" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={mode + '-audience-header'}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            {mode === 'student' ? 'Кому подойдут занятия?' : 'Кому подходят занятия'}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {mode === 'student'
              ? 'Если тебе нужна помощь с химией — ты по адресу'
              : 'Подберём формат обучения под задачи вашего ребёнка'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={mode + '-aud-' + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}