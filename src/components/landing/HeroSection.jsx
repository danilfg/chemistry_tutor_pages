import React from 'react';
import { useMode } from './ModeContext';
import { ArrowRight, ChevronDown, Star, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from './ContentContext';

export default function HeroSection() {
  const { mode } = useMode();
  const { texts } = useContent();
  const c = {
    title: texts[`hero-${mode}-title`],
    subtitle: texts[`hero-${mode}-subtitle`],
    cta: texts[`hero-${mode}-cta`],
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-body font-medium mb-6">
              <FlaskIcon />
              Демонстрация интерфейса
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              {c.title}
            </h1>

            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {c.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="https://arsenikum.ru/"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-semibold text-base hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Основной сайт
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-8 py-4 rounded-full font-body font-semibold text-base hover:border-primary hover:text-primary transition-colors"
              >
                Пример тарифов
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-body text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Рейтинг 5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>9+ лет опыта</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary" />
                <span>РХТУ им. Менделеева</span>
              </div>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://avatars.mds.yandex.net/get-ydo/15074467/2a0000019c13aacc0acb70a3fdfdffa65ed6/diploma"
                alt="Арсения Пономарева — репетитор по химии"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -left-8 bottom-12 bg-card p-4 rounded-2xl shadow-xl border border-border"
            >
              <div className="text-2xl font-heading font-bold text-primary">70–72</div>
              <div className="text-xs font-body text-muted-foreground">Средний балл ЕГЭ<br/>учеников</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-4 top-12 bg-card p-4 rounded-2xl shadow-xl border border-border"
            >
              <div className="text-2xl font-heading font-bold text-secondary">30+</div>
              <div className="text-xs font-body text-muted-foreground">Отзывов на<br/>Яндекс Услугах</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlaskIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22h12"/>
      <path d="M10 2v6.5"/>
      <path d="M14 2v6.5"/>
      <path d="M10 8.5 6.5 18h11L14 8.5"/>
    </svg>
  );
}
