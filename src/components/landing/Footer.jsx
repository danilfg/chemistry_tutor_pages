import React from 'react';
import { FlaskConical } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-heading font-bold text-lg">
            <FlaskConical className="w-5 h-5" />
            А. Пономарева
          </div>
          <div className="font-body text-sm opacity-70 text-center">
            Репетитор по химии · ЕГЭ, ОГЭ, ДВИ · Москва / Онлайн
          </div>
          <div className="font-body text-sm opacity-50">
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}