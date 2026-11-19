import React from 'react';
import { useMode } from './ModeContext';
import { Target, BarChart3, FileText, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = {
  student: [
    { icon: Target, num: '01', title: 'Определяем цель', desc: 'Расскажи, что нужно: подготовка к ЕГЭ, подтянуть оценки, разобрать тему' },
    { icon: BarChart3, num: '02', title: 'Проверяем уровень', desc: 'Выясним, что ты уже знаешь, а где есть пробелы' },
    { icon: FileText, num: '03', title: 'Составляем план', desc: 'Делаем программу занятий под твои задачи и сроки' },
    { icon: Repeat, num: '04', title: 'Занимаемся', desc: 'Регулярные занятия с практикой, разбором ошибок и поддержкой' },
  ],
  parent: [
    { icon: Target, num: '01', title: 'Определение целей', desc: 'Обсуждаем задачи: экзамены, успеваемость, олимпиады' },
    { icon: BarChart3, num: '02', title: 'Диагностика уровня', desc: 'Оцениваем текущие знания и определяем пробелы' },
    { icon: FileText, num: '03', title: 'Индивидуальный план', desc: 'Составляем структурированную программу подготовки' },
    { icon: Repeat, num: '04', title: 'Системные занятия', desc: 'Регулярные уроки с практикой, контролем прогресса и отчётами' },
  ],
};

export default function HowItWorksSection() {
  const { mode } = useMode();
  const items = steps[mode];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={mode + '-how-header'}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            {mode === 'student' ? 'Как проходят занятия' : 'Как устроен процесс'}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {mode === 'student'
              ? 'Четыре простых шага от «ничего не понимаю» до уверенности'
              : 'Структурированный подход к подготовке вашего ребёнка'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={mode + '-step-' + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {i < 3 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-border -z-10" />
              )}
              <div className="bg-card rounded-2xl p-6 border border-border h-full">
                <span className="font-heading font-bold text-4xl text-primary/15">{item.num}</span>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center my-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}