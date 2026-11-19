import React from 'react';
import { useMode } from './ModeContext';
import { Check, Star, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from './ContentContext';

export default function PricingSection({ onSelectTariff }) {
  const { mode } = useMode();
  const { tariffs } = useContent();

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            {mode === 'student' ? 'Выбери свой формат' : 'Стоимость занятий'}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {mode === 'student'
              ? 'От самостоятельного изучения до полной поддержки — выбирай, что тебе нужно'
              : 'Прозрачные цены и гибкие форматы обучения'}
          </p>
        </motion.div>

        {/* Free trainer card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <a
            href="#lab"
            onClick={e => { e.preventDefault(); document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-6 hover:border-primary transition-colors cursor-pointer"
          >
            <div className="w-14 h-14 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <span className="font-heading font-bold text-lg text-foreground">Бесплатный тренажёр</span>
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-0.5 rounded-full">Бесплатно</span>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                Попробуй интерактивную химическую лабораторию прямо сейчас — смешивай реагенты и изучай реакции без регистрации
              </p>
            </div>
            <div className="sm:ml-auto flex-shrink-0">
              <span className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                Попробовать →
              </span>
            </div>
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tariffs.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative bg-background rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                t.recommended
                  ? 'border-primary shadow-lg shadow-primary/10'
                  : 'border-border hover:border-primary/30'
              } ${t.recommended && i === 3 ? 'lg:col-span-1' : ''}`}
            >
              {t.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-body font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Рекомендуемый
                </div>
              )}

              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{t.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4">{t[mode].desc}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading font-bold text-3xl text-foreground">{t.price}</span>
                <span className="font-body text-sm text-muted-foreground">{t.unit}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {t.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm font-body text-foreground">
                    <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectTariff(t.name)}
                className={`w-full py-3 rounded-full font-body font-semibold text-sm transition-all ${
                  t.recommended
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {t[mode].buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
