import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, RotateCcw } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'magnet',
    title: 'Магнит',
    subtitle: 'Сера + Железо',
    icon: '🧲',
    method: 'Магнитное разделение',
    mixture: { a: { name: 'Железо', color: '#94a3b8', symbol: 'Fe', magnetic: true }, b: { name: 'Сера', color: '#fde047', symbol: 'S', magnetic: false } },
    steps: [
      { label: 'Смешиваем', desc: 'Порошок железа смешан с порошком серы. Внешне трудно различить — оба имеют мелкую форму.' },
      { label: 'Подносим магнит', desc: 'Магнит притягивает только частицы железа — они обладают магнитными свойствами. Сера немагнитна.' },
      { label: 'Разделено!', desc: 'Железо притянуто к магниту, сера осталась на месте. Разделение основано на разных магнитных свойствах.' },
    ],
    fact: 'Железо — ферромагнетик, поэтому притягивается к магниту. Сера — диамагнетик, на магнит не реагирует. Этот метод используют на металлургических заводах для сортировки металлолома.',
  },
  {
    id: 'filter',
    title: 'Фильтрование',
    subtitle: 'Соль + Речной песок',
    icon: '🔽',
    method: 'Фильтрование + Выпаривание',
    mixture: { a: { name: 'Поваренная соль', color: '#f1f5f9', symbol: 'NaCl', soluble: true }, b: { name: 'Песок', color: '#d97706', symbol: 'SiO₂', soluble: false } },
    steps: [
      { label: 'Смесь в воде', desc: 'Смесь соли и песка растворяем в воде. Соль растворяется, песок оседает на дно.' },
      { label: 'Фильтрование', desc: 'Пропускаем через фильтр: песок задерживается, солёный раствор проходит насквозь.' },
      { label: 'Выпаривание', desc: 'Нагреваем раствор — вода испаряется, остаётся чистая соль. Разделение завершено!' },
    ],
    fact: 'Растворимость — ключевое свойство при разделении. NaCl хорошо растворяется в воде (36 г/100 мл при 20°C), а SiO₂ (кварцевый песок) практически нерастворим. Этот принцип лежит в основе очистки воды.',
  },
  {
    id: 'evaporation',
    title: 'Выпаривание',
    subtitle: 'Морская вода + Соль',
    icon: '☀️',
    method: 'Выпаривание',
    mixture: { a: { name: 'Вода', color: '#bfdbfe', symbol: 'H₂O', volatile: true }, b: { name: 'Соль NaCl', color: '#f8fafc', symbol: 'NaCl', volatile: false } },
    steps: [
      { label: 'Солёная вода', desc: 'Морская вода содержит около 35 г соли на литр. Разделить их обычным способом нельзя — оба вещества прозрачны.' },
      { label: 'Нагреваем', desc: 'При нагревании вода начинает испаряться — переходит из жидкого состояния в газообразное.' },
      { label: 'Готово!', desc: 'Вода улетучилась, кристаллы соли остались в чашке. Так добывают соль из морской воды в солёварнях!' },
    ],
    fact: 'Выпаривание используется при добыче морской соли тысячи лет. Температура кипения воды 100°C, а NaCl плавится лишь при 801°C. Именно разница температур кипения и позволяет разделить смесь.',
  },
  {
    id: 'sieve',
    title: 'Просеивание',
    subtitle: 'Мука + Крупа',
    icon: '🫙',
    method: 'Просеивание (механическое)',
    mixture: { a: { name: 'Мука (мелкая)', color: '#fef9c3', symbol: 'мука', small: true }, b: { name: 'Крупа (крупная)', color: '#d97706', symbol: 'крупа', small: false } },
    steps: [
      { label: 'Смесь', desc: 'Смешаны частицы разного размера — мелкая мука и крупные зёрна крупы. Разделить вручную очень сложно.' },
      { label: 'Сито в работе', desc: 'Высыпаем смесь на сито. Мелкие частицы муки проваливаются сквозь ячейки, крупные — задерживаются.' },
      { label: 'Разделено!', desc: 'Мука просыпалась вниз, крупа осталась на сите. Разделение по размеру частиц — одно из самых простых!' },
    ],
    fact: 'Просеивание — один из древнейших методов разделения. Размер ячеек сита подбирают под конкретную задачу. В промышленности этот метод называют классификацией и используют для сортировки песка, гравия, руды.',
  },
];

function Particle({ x, y, color, size = 8, shape = 'circle' }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '50%',
        background: color,
        boxShadow: `0 1px 3px rgba(0,0,0,0.2)`,
      }}
    />
  );
}

function ScenarioVisual({ scenario, step }) {
  const { id, mixture } = scenario;

  // Генерация частиц для фона
  const particles = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        id: i,
        isA: i % 2 === 0,
        x: 20 + (i % 6) * 45 + (Math.sin(i * 2.3) * 10),
        y: 60 + Math.floor(i / 6) * 40 + (Math.cos(i * 1.7) * 8),
        size: 10 + (i % 3) * 3,
      });
    }
    return arr;
  }, []);

  if (id === 'magnet') {
    return (
      <div className="relative w-full h-52 bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
        {/* Particles base */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={
              step === 1
                ? { x: p.isA ? 0 : 0, y: 0, opacity: 1 }
                : step === 2
                ? { x: p.isA ? (60 - p.x) : 0, y: p.isA ? (10 - p.y) : 0, opacity: 1 }
                : { x: p.isA ? (60 - p.x) : 0, y: p.isA ? (10 - p.y) : 0, opacity: 1 }
            }
            transition={{ duration: 0.8, delay: p.id * 0.03, type: 'spring', stiffness: 80 }}
            style={{ position: 'absolute', left: p.x + 60, top: p.y, width: p.size, height: p.size, borderRadius: '50%', background: p.isA ? '#94a3b8' : '#fde047', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
          />
        ))}

        {/* Magnet */}
        <motion.div
          animate={step === 0 ? { x: 200, y: -60, opacity: 0 } : step === 1 ? { x: 20, y: 8, opacity: 1 } : { x: 20, y: 8, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          <div className="bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-t-full text-center shadow-lg">🧲 N</div>
          <div className="bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-b-full text-center shadow-lg">S</div>
        </motion.div>

        {/* Labels */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-slate-600 font-body">Fe — серый</span>
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-yellow-700 font-body">S — жёлтый</span>
        </div>
      </div>
    );
  }

  if (id === 'filter') {
    return (
      <div className="relative w-full h-52 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl overflow-hidden">
        {/* Container / beaker */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-28 h-32 border-2 border-blue-300 rounded-b-xl overflow-hidden">
          {/* Water */}
          <motion.div
            animate={{ height: step === 0 ? '80%' : step === 1 ? '40%' : '0%' }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-0 right-0 bg-blue-200/70"
          />
          {/* Sand particles */}
          {step === 0 && [0,1,2,3,4].map(i => (
            <div key={i} style={{ position:'absolute', bottom: 4 + i*3, left: 10 + i*16, width:10, height:10, borderRadius:'50%', background:'#d97706' }} />
          ))}
          {/* Salt crystals in solution */}
          {step === 0 && [0,1,2].map(i => (
            <div key={i} style={{ position:'absolute', top: 20 + i*15, left: 20 + i*20, width:6, height:6, background:'rgba(255,255,255,0.8)', borderRadius:1 }} />
          ))}
        </div>

        {/* Filter paper */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 top-36"
            >
              <div className="w-20 h-3 bg-amber-100 border border-amber-300 rounded" style={{ clipPath:'polygon(0 0,100% 0,85% 100%,15% 100%)' }} />
              {/* Sand on filter */}
              {[0,1,2].map(i => (
                <div key={i} style={{ position:'absolute', top: 4, left: 6+i*6, width:6, height:6, borderRadius:'50%', background:'#d97706' }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evaporation flame */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl">
              🔥
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-amber-700 font-body">Песок</span>
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-blue-700 font-body">Раствор NaCl</span>
        </div>
      </div>
    );
  }

  if (id === 'evaporation') {
    return (
      <div className="relative w-full h-52 bg-gradient-to-b from-amber-50 to-orange-100 rounded-2xl overflow-hidden">
        {/* Evaporation dish */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-36 h-16 border-2 border-amber-400 rounded-b-full overflow-hidden">
          {/* Water level */}
          <motion.div
            animate={{ height: step === 0 ? '90%' : step === 1 ? '50%' : '5%' }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-0 left-0 right-0 bg-blue-200"
          />
          {/* Salt crystals appear */}
          {step === 2 && [0,1,2,3,4,5].map(i => (
            <motion.div
              key={i}
              initial={{ opacity:0, scale:0 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay: i*0.1 }}
              style={{ position:'absolute', bottom: 2, left: 8+i*20, width:14, height:8, background:'rgba(255,255,255,0.9)', borderRadius:2, border:'1px solid #cbd5e1' }}
            />
          ))}
        </div>

        {/* Steam rising */}
        <AnimatePresence>
          {step >= 1 && [0,1,2].map(i => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -60, opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
              style={{ position:'absolute', bottom: 60, left: `${30 + i * 20}%`, fontSize: 18 }}
            >
              💧
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Flame */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl">🔥</motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-3 left-2 right-2 flex justify-between">
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-blue-700 font-body">Вода (испаряется)</span>
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-slate-700 font-body">NaCl (остаётся)</span>
        </div>
      </div>
    );
  }

  if (id === 'sieve') {
    return (
      <div className="relative w-full h-52 bg-gradient-to-b from-amber-50 to-stone-100 rounded-2xl overflow-hidden">
        {/* Sieve */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-40 h-6 border-2 border-amber-600 rounded">
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} style={{ position:'absolute', top:4, left: 6+i*13, width:5, height:10, borderRadius:1, background:'rgba(0,0,0,0.1)', border:'1px solid #92400e' }} />
          ))}
        </div>

        {/* Large particles (stay on sieve) */}
        {[0,1,2,3,4].map(i => (
          <motion.div
            key={i}
            animate={step === 0 ? { y: 0, x: 0 } : { y: step >= 1 ? -2 : 0 }}
            style={{ position:'absolute', top: 4, left: 30 + i*26, width:16, height:16, borderRadius:3, background:'#d97706' }}
          />
        ))}

        {/* Small particles (fall through) */}
        {[0,1,2,3,4,5,6].map(i => (
          <motion.div
            key={i}
            animate={step === 0 ? { y: 0 } : step >= 1 ? { y: 100, opacity: step === 2 ? 1 : 0.5 } : { y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            style={{ position:'absolute', top: 8, left: 38 + i*18, width:6, height:6, borderRadius:'50%', background:'#fef08a' }}
          />
        ))}

        {/* Collection below */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-amber-100 border border-amber-300 rounded-b-xl flex items-center justify-center">
              <span className="text-[10px] font-body text-amber-800">Мука просыпалась</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-amber-700 font-body">🟠 Крупа — крупные частицы</span>
        </div>
        <div className="absolute bottom-6 left-2">
          <span className="text-[10px] bg-white/80 rounded px-1.5 py-0.5 text-yellow-700 font-body">🟡 Мука — мелкие частицы</span>
        </div>
      </div>
    );
  }

  return null;
}

export default function MixtureSeparationSection() {
  const [scIdx, setScIdx] = useState(0);
  const [step, setStep] = useState(0);

  const scenario = SCENARIOS[scIdx];

  const handleNext = () => {
    if (step < scenario.steps.length - 1) setStep(s => s + 1);
  };

  const handleReset = () => setStep(0);

  const changeScenario = (idx) => {
    setScIdx(idx);
    setStep(0);
  };

  const isDone = step === scenario.steps.length - 1;

  return (
    <section className="py-20 lg:py-24 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-body font-medium mb-4">
            <Beaker className="w-4 h-4" />
            Интерактивный тренажёр
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Разделение смесей
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            Выбери способ разделения и нажимай кнопку — смотри процесс в реальном времени
          </p>
        </motion.div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => changeScenario(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold transition-all ${
                scIdx === i
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <span>{sc.icon}</span>
              <span className="hidden sm:inline">{sc.title}:</span> {sc.subtitle}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px)' }} />

          <div className="relative">
            {/* Method badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/10 text-white/80 text-xs font-body px-3 py-1 rounded-full">
                Метод: <span className="font-semibold text-white">{scenario.method}</span>
              </div>
              <div className="text-white/40 text-xs font-body">
                Шаг {step + 1} из {scenario.steps.length}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
              <motion.div
                animate={{ width: `${((step + 1) / scenario.steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="bg-primary h-1.5 rounded-full"
              />
            </div>

            {/* Visual */}
            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div key={scIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ScenarioVisual scenario={scenario} step={step} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${scIdx}-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/10 rounded-2xl p-4 mb-6"
              >
                <div className="font-heading font-bold text-white text-base mb-1">
                  {scenario.steps[step].label}
                </div>
                <div className="font-body text-white/70 text-sm leading-relaxed">
                  {scenario.steps[step].desc}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-white/10 text-white/80 hover:bg-white/20 px-5 py-2.5 rounded-full font-body font-medium text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Сначала
              </button>
              <button
                onClick={handleNext}
                disabled={isDone}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-full font-body font-semibold text-sm transition-all ${
                  isDone
                    ? 'bg-primary/30 text-primary/60 cursor-default'
                    : 'bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/30'
                }`}
              >
                {isDone ? '✅ Разделение завершено!' : `${scenario.steps[step + 1]?.label ?? 'Далее'} →`}
              </button>
            </div>
          </div>
        </div>

        {/* Fact card */}
        <AnimatePresence mode="wait">
          {isDone && (
            <motion.div
              key={scIdx + '-fact'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-6"
            >
              <div className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
                <span>🔬</span> Интересный факт
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{scenario.fact}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
