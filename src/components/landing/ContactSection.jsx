import React from 'react';
import { useMode } from './ModeContext';
import { MessageCircle, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from './ContentContext';

export default function ContactSection({ selectedTariff }) {
  const { mode } = useMode();
  const { texts, contacts } = useContent();

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            {texts[`contact-${mode}-title`]}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {texts[`contact-${mode}-subtitle`]}
          </p>
        </motion.div>

        {selectedTariff && <p className="text-center text-sm font-body text-muted-foreground mb-6">Выбранный формат: <strong>{selectedTariff}</strong>. Укажите его в сообщении преподавателю.</p>}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">Telegram</div>
                <div className="font-body text-sm text-muted-foreground">{contacts.telegram.replace(/^https?:\/\/t\.me\//, '@')}</div>
              </div>
            </a>

            <a
              href={`tel:${contacts.phone.replace(/[^\d+]/g, '')}`}
              className="flex items-center gap-4 bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">Телефон</div>
                <div className="font-body text-sm text-muted-foreground">{contacts.phone}</div>
              </div>
            </a>

            <a
              href={contacts.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.764 3.654c-.0014.0033-.0027.0066-.004.01C14.979 12.524 14 12 14 12V7.5a.5.5 0 0 0-.5-.5H10a.5.5 0 0 0 0 1h.5v8h1.5v-4.5c0-.553.448-1.5 2-1.5s2 .947 2 1.5V16h1.5v-4.5c0-1.688-1.094-2.5-2.5-2.5-.738 0-1.365.23-1.85.575.176-.558.35-1.13.35-1.575H10.5V8H13v4.5c0 .277.447.5 1 .5s1-.223 1-.5V8h1.5c.277 0 .5-.224.5-.5v-1a.5.5 0 0 0-.5-.5H14V5h1.5c.828 0 1.5-.671 1.5-1.5V3a.5.5 0 0 0-.5-.5H14c-.276 0-.5.224-.5.5v.5H10V3a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5v1C5.5 4.329 6.172 5 7 5h1.5v1H7a.5.5 0 0 0-.5.5v1c0 .276.224.5.5.5h1.5V16H7a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1h-1.5v-4.5c0-.553.448-1 1-1s1 .447 1 1V16h1.5v-4.785c.517.32.895.785.895 1.285V16H21a.5.5 0 0 0 .5-.5v-1c0-.828-.672-1.5-1.5-1.5h-.5v-1.5c0-1.381 1.119-2.5 2.5-2.5h.047A.5.5 0 0 0 22 8.5v-1a.5.5 0 0 0-.453-.5z"/>
                </svg>
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">ВКонтакте</div>
                <div className="font-body text-sm text-muted-foreground">{contacts.vk.replace(/^https?:\/\//, '')}</div>
              </div>
            </a>

            <a
              href={`mailto:${contacts.email}`}
              className="flex items-center gap-4 bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">Почта</div>
                <div className="font-body text-sm text-muted-foreground">{contacts.email}</div>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">График</div>
                <div className="font-body text-sm text-muted-foreground">{contacts.extra_text}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <div className="font-heading font-semibold text-foreground">Формат</div>
                <div className="font-body text-sm text-muted-foreground">{contacts.address}</div>
                <div className="font-body text-sm text-muted-foreground">Онлайн из любого города</div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
