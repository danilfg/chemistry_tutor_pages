import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react';

// Ряд активности металлов (от наиболее активных к наименее)
const METALS = [
  { symbol: 'Li', name: 'Литий',     activity: 'very-high', note: 'Реагирует с водой взрывообразно' },
  { symbol: 'K',  name: 'Калий',     activity: 'very-high', note: 'Реагирует с водой со вспышкой' },
  { symbol: 'Ca', name: 'Кальций',   activity: 'very-high', note: 'Реагирует с водой' },
  { symbol: 'Na', name: 'Натрий',    activity: 'very-high', note: 'Реагирует с водой бурно' },
  { symbol: 'Mg', name: 'Магний',    activity: 'high',      note: 'Реагирует с кислотами и горячей водой' },
  { symbol: 'Al', name: 'Алюминий',  activity: 'high',      note: 'Реагирует с кислотами и щелочами' },
  { symbol: 'Zn', name: 'Цинк',      activity: 'high',      note: 'Реагирует с кислотами и щелочами' },
  { symbol: 'Fe', name: 'Железо',    activity: 'medium',    note: 'Реагирует с разбавленными кислотами' },
  { symbol: 'Ni', name: 'Никель',    activity: 'medium',    note: 'Реагирует с разбавленными кислотами' },
  { symbol: 'Sn', name: 'Олово',     activity: 'medium',    note: 'Реагирует с концентрированными кислотами' },
  { symbol: 'Pb', name: 'Свинец',    activity: 'medium',    note: 'Реагирует с концентрированными кислотами' },
  { symbol: 'H',  name: 'Водород',   activity: 'ref',       note: 'Граница: металлы левее вытесняют H₂ из кислот' },
  { symbol: 'Cu', name: 'Медь',      activity: 'low',       note: 'Не реагирует с разбавленными кислотами' },
  { symbol: 'Ag', name: 'Серебро',   activity: 'low',       note: 'Реагирует только с HNO₃' },
  { symbol: 'Au', name: 'Золото',    activity: 'very-low',  note: 'Реагирует только с «царской водкой»' },
];

const ACTIVITY_STYLES = {
  'very-high': { bar: 'bg-red-500',    badge: 'bg-red-100 text-red-700',    label: 'Очень активный' },
  'high':      { bar: 'bg-orange-400', badge: 'bg-orange-100 text-orange-700', label: 'Активный' },
  'medium':    { bar: 'bg-yellow-400', badge: 'bg-yellow-100 text-yellow-700', label: 'Средняя активность' },
  'ref':       { bar: 'bg-blue-400',   badge: 'bg-blue-100 text-blue-700',   label: 'Водород (граница)' },
  'low':       { bar: 'bg-green-400',  badge: 'bg-green-100 text-green-700', label: 'Малоактивный' },
  'very-low':  { bar: 'bg-gray-400',   badge: 'bg-gray-100 text-gray-700',   label: 'Неактивный' },
};

// Примеры вытеснения из реакций лаборатории
const EXAMPLES = [
  {
    id: 1,
    title: 'Fe вытесняет Cu',
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    explanation: 'Железо стоит левее меди в ряду активности — значит, оно активнее. Железо «отбирает» место меди в соли, а медь выпадает в осадок красного цвета.',
    left: 'Fe',
    right: 'Cu',
    color: '#f97316',
  },
  {
    id: 2,
    title: 'Zn вытесняет H₂ из кислоты',
    equation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑',
    explanation: 'Цинк стоит левее водорода — значит, он активнее. Поэтому Zn вытесняет H₂ из кислоты. Металлы правее водорода (Cu, Ag, Au) этого не делают.',
    left: 'Zn',
    right: 'H',
    color: '#3b82f6',
  },
  {
    id: 3,
    title: 'Na реагирует с водой',
    equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    explanation: 'Натрий — очень активный металл, стоит в начале ряда. Он настолько реакционноспособен, что вытесняет водород даже из воды, а не только из кислот.',
    left: 'Na',
    right: 'H',
    color: '#8b5cf6',
  },
  {
    id: 4,
    title: 'Al — алюминотермия (термит)',
    equation: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
    explanation: 'Алюминий активнее железа, поэтому вытесняет его из оксида. Это термитная реакция — выделяется температура свыше 2000°C и железо образуется в расплавленном виде.',
    left: 'Al',
    right: 'Fe',
    color: '#f59e0b',
  },
];

function MetalCard({ metal, index }) {
  const style = ACTIVITY_STYLES[metal.activity];
  const barWidth = Math.max(10, 100 - index * (100 / METALS.length));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-3 py-2 px-3 rounded-xl ${metal.activity === 'ref' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-muted/50'} transition-colors`}
    >
      {/* Symbol */}
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-card border border-border rounded-lg shadow-sm">
        <span className={`font-heading font-bold text-sm ${metal.activity === 'ref' ? 'text-blue-600' : 'text-foreground'}`}>{metal.symbol}</span>
      </div>
      {/* Name */}
      <div className="w-20 flex-shrink-0">
        <div className="font-body text-sm font-medium text-foreground">{metal.name}</div>
      </div>
      {/* Activity bar */}
      <div className="flex-1 hidden sm:block">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${barWidth}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 + 0.2, duration: 0.5 }}
            className={`h-full rounded-full ${style.bar}`}
          />
        </div>
      </div>
      {/* Badge */}
      <div className={`hidden md:block px-2 py-0.5 rounded-full text-xs font-body font-medium flex-shrink-0 ${style.badge}`}>
        {style.label}
      </div>
    </motion.div>
  );
}

function ExampleCard({ example }) {
  const [open, setOpen] = useState(false);
  const leftIdx = METALS.findIndex(m => m.symbol === example.left);
  const rightIdx = METALS.findIndex(m => m.symbol === example.right);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: example.color + '22' }}>
            <FlaskConical className="w-4 h-4" style={{ color: example.color }} />
          </div>
          <div>
            <div className="font-heading font-semibold text-foreground text-sm">{example.title}</div>
            <div className="font-body font-mono text-muted-foreground text-xs mt-0.5">{example.equation}</div>
          </div>
        </div>
        <div className="flex-shrink-0 text-muted-foreground">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border pt-3">
              {/* Position in series */}
              <div className="flex items-center gap-2 mb-3 text-xs font-body text-muted-foreground">
                <span className="font-semibold text-foreground">{example.left}</span>
                <span>(#{leftIdx + 1})</span>
                <span className="text-primary font-bold mx-1">→ активнее →</span>
                <span className="font-semibold text-foreground">{example.right}</span>
                <span>(#{rightIdx + 1})</span>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{example.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ActivitySeriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-body font-medium mb-4">
            <Zap className="w-4 h-4" />
            Ряд активности металлов
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Кто кого вытесняет?
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Металл вытесняет из соли или кислоты тот металл, который стоит <strong>правее</strong> него в ряду активности. Чем левее — тем активнее.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Series */}
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs">↑</span>
              Активность убывает →
            </h3>
            <div className="space-y-1">
              {METALS.map((m, i) => (
                <MetalCard key={m.symbol} metal={m} index={i} />
              ))}
            </div>
          </div>

          {/* Examples + Rule */}
          <div className="flex flex-col gap-6">
            {/* Rule box */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-5">
              <h3 className="font-heading font-bold text-foreground mb-3">Правило вытеснения</h3>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">①</span> Металл вытесняет из раствора соли тот металл, что стоит <em>правее</em> него.</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">②</span> Металлы <em>левее водорода</em> вытесняют H₂ из разбавленных кислот.</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">③</span> Металлы правее водорода (Cu, Ag, Au) с разбавленными кислотами не реагируют.</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">④</span> Li, K, Na, Ca реагируют с водой (очень активные!).</li>
              </ul>
            </div>

            {/* Examples */}
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">Примеры из лаборатории</h3>
              <div className="space-y-3">
                {EXAMPLES.map(ex => (
                  <ExampleCard key={ex.id} example={ex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}