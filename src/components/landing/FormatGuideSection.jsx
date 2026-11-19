import React from 'react';
import { useMode } from './ModeContext';
import { BookOpen, ClipboardCheck, UserCheck, Layers, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const guides = {
  student: [
    { icon: BookOpen, need: 'Хочу учиться сам', rec: 'Курс без сопровождения' },
    { icon: ClipboardCheck, need: 'Нужна проверка домашки', rec: 'Курс с проверкой ДЗ' },
    { icon: UserCheck, need: 'Нужен разбор тем один на один', rec: 'Индивидуальные занятия' },
    { icon: Layers, need: 'Хочу максимальную поддержку', rec: 'Полный курс' },
    { icon: Users, need: 'Нравится учиться в компании', rec: 'Групповые занятия' },
  ],
  parent: [
    { icon: BookOpen, need: 'Самостоятельная подготовка', rec: 'Курс без сопровождения' },
    { icon: ClipboardCheck, need: 'Нужен контроль заданий', rec: 'Курс с проверкой ДЗ' },
    { icon: UserCheck, need: 'Требуется разбор сложных тем', rec: 'Индивидуальные занятия' },
    { icon: Layers, need: 'Максимальная поддержка', rec: 'Полный курс' },
    { icon: Users, need: 'Групповой формат обучения', rec: 'Групповые занятия' },
  ],
};

export default function FormatGuideSection() {
  const { mode } = useMode();
  const items = guides[mode];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            {mode === 'student' ? 'Какой формат тебе подходит?' : 'Как выбрать формат'}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={mode + '-guide-' + i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <span className="font-body text-muted-foreground text-sm">{item.need}</span>
              </div>
              <div className="hidden sm:block w-8 text-center text-muted-foreground">→</div>
              <div className="font-heading font-semibold text-sm text-primary">{item.rec}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}