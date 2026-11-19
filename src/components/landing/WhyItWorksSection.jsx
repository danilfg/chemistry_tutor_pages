import React from 'react';
import { useMode } from './ModeContext';
import { MessageCircle, UserCheck, BarChart3, ClipboardCheck, Search, HelpCircle, RotateCcw, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const advantages = {
  student: [
    { icon: MessageCircle, title: 'Простым языком', desc: 'Объясняю так, чтобы реально стало понятно, а не зубрил' },
    { icon: UserCheck, title: 'Под тебя', desc: 'Программа занятий строится под твои цели и уровень' },
    { icon: BarChart3, title: 'Готовлю к экзаменам', desc: 'Проходим именно то, что спрашивают на ОГЭ и ЕГЭ' },
    { icon: ClipboardCheck, title: 'Проверяю домашку', desc: 'Проверю задания и разберём все ошибки вместе' },
    { icon: Search, title: 'Разбор ошибок', desc: 'Поймёшь, где ошибаешься и почему — больше не повторишь' },
    { icon: HelpCircle, title: 'Можно спрашивать', desc: 'Задавай любые вопросы, глупых вопросов не бывает' },
    { icon: RotateCcw, title: 'Много практики', desc: 'Решаем задачи, тренируемся на вариантах, закрепляем' },
    { icon: Wifi, title: 'Онлайн', desc: 'Занимайся из любого города, нужен только интернет' },
  ],
  parent: [
    { icon: MessageCircle, title: 'Доступные объяснения', desc: 'Сложные темы объясняются понятным и структурным языком' },
    { icon: UserCheck, title: 'Индивидуальный подход', desc: 'Программа адаптируется под уровень и цели ученика' },
    { icon: BarChart3, title: 'Системная подготовка', desc: 'Методика фокусируется на реальных заданиях экзаменов' },
    { icon: ClipboardCheck, title: 'Проверка заданий', desc: 'Регулярная проверка домашних заданий с комментариями' },
    { icon: Search, title: 'Анализ ошибок', desc: 'Детальный разбор ошибок для предотвращения повторения' },
    { icon: HelpCircle, title: 'Постоянная поддержка', desc: 'Ученик может задавать вопросы и получать разъяснения' },
    { icon: RotateCcw, title: 'Регулярная практика', desc: 'Систематическое решение задач и тренировка навыков' },
    { icon: Wifi, title: 'Дистанционно', desc: 'Онлайн-занятия из любого города без потери качества' },
  ],
};

export default function WhyItWorksSection() {
  const { mode } = useMode();
  const items = advantages[mode];

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={mode + '-why-header'}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            {mode === 'student' ? 'Почему занятия работают' : 'Почему занятия приносят результат'}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {mode === 'student'
              ? 'Не просто «прочитали учебник» — реально разбираемся'
              : 'Проверенный подход с фокусом на понимание и результат'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={mode + '-why-' + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center p-6"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
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