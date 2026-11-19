import React from 'react';
import { ExternalLink, FlaskConical } from 'lucide-react';

export default function ContactSection() {
  return <section id="contact" className="py-20 lg:py-28">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto mb-6 flex items-center justify-center"><FlaskConical className="w-8 h-8"/></div>
      <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">Основной сайт проекта</h2>
      <p className="text-muted-foreground font-body mb-8">Это демонстрация пользовательского интерфейса и бесплатных химических тренажёров. Актуальная информация и контакты доступны на основном сайте.</p>
      <a href="https://arsenikum.ru/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90">Перейти на arsenikum.ru <ExternalLink className="w-4 h-4"/></a>
    </div>
  </section>;
}
