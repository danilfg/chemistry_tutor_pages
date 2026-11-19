import React from 'react';
import { useMode } from './ModeContext';
import { Award, Clock, MapPin, GraduationCap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from './ContentContext';

export default function AboutSection() {
  const { mode } = useMode();
  const { texts } = useContent();

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            О преподавателе
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0">
              <img
                src="https://avatars.mds.yandex.net/get-ydo/15074467/2a0000019c13aacc0acb70a3fdfdffa65ed6/diploma"
                alt="Арсения Пономарева"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
              Арсения Пономарева
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Репетитор по химии · РХТУ им. Д.И. Менделеева
            </p>

            <p className="font-body text-foreground leading-relaxed mb-6">
              {texts[`about-${mode}-text`]}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-sm font-body">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span>9+ лет опыта</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-body">
                <Award className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Рейтинг 5.0</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-body">
                <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                <span>РХТУ им. Менделеева</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-body">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Москва / Онлайн</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-foreground">Подход к обучению:</h4>
              {[
                'Чёткий план: от важных тем к менее важным',
                'Фокус на реальных заданиях экзаменов',
                'Отчёт о прогрессе раз в 2 месяца',
                'Логика предмета — помогает на сложных вопросах',
                'Комплексная подготовка: индивидуально, группы, курс',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
