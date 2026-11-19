import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, FlaskConical, AlertCircle, X } from 'lucide-react';

// Атомные массы — округлённые значения как в школьной таблице Менделеева
// Исключение: Cl = 35.5 (принято в школьной программе)
const ATOMIC_MASSES = {
  H:1,   He:4,  Li:7,  Be:9,  B:11,  C:12,  N:14,  O:16,  F:19,  Ne:20,
  Na:23, Mg:24, Al:27, Si:28, P:31,  S:32,  Cl:35.5,Ar:40, K:39,  Ca:40,
  Sc:45, Ti:48, V:51,  Cr:52, Mn:55, Fe:56, Co:59,  Ni:58, Cu:64, Zn:65,
  Ga:70, Ge:72, As:75, Se:79, Br:80, Kr:84, Rb:85,  Sr:88, Y:89,  Zr:91,
  Nb:93, Mo:96, Tc:98, Ru:101,Rh:103,Pd:106,Ag:108, Cd:112,In:115,Sn:119,
  Sb:122,Te:128,I:127, Xe:131,Cs:133,Ba:137,La:139, Ce:140,Pr:141,Nd:144,
  Pm:145,Sm:150,Eu:152,Gd:157,Tb:159,Dy:163,Ho:165, Er:167,Tm:169,Yb:173,
  Lu:175,Hf:178,Ta:181,W:184, Re:186,Os:190,Ir:192,  Pt:195,Au:197,Hg:201,
  Tl:204,Pb:207,Bi:209,Po:209,At:210,Rn:222,Fr:223,  Ra:226,Ac:227,Th:232,
  Pa:231,U:238, Np:237,Pu:244,Am:243,Cm:247,Bk:247,  Cf:251,Es:252,Fm:257,
  Md:258,No:259,Lr:262,Rf:265,Db:268,Sg:271,Bh:270,  Hs:277,Mt:278,Ds:281,
  Rg:282,Cn:285,Nh:286,Fl:289,Mc:290,Lv:293,Ts:294,  Og:294,
};

// Парсер химических формул: поддерживает вложенные скобки, числа, заглавные буквы
function parseFormula(formula) {
  const tokens = [];
  let i = 0;

  function readGroup() {
    const counts = {};
    while (i < formula.length) {
      const ch = formula[i];

      if (ch === '(') {
        i++;
        const inner = readGroup();
        if (formula[i] !== ')') throw new Error(`Ожидается ")" на позиции ${i}`);
        i++;
        const num = readNumber();
        for (const [el, cnt] of Object.entries(inner)) {
          counts[el] = (counts[el] || 0) + cnt * num;
        }
      } else if (ch === ')') {
        break;
      } else if (ch >= 'A' && ch <= 'Z') {
        const el = readElement();
        const num = readNumber();
        counts[el] = (counts[el] || 0) + num;
      } else {
        throw new Error(`Неожиданный символ "${ch}" на позиции ${i}`);
      }
    }
    return counts;
  }

  function readElement() {
    let el = formula[i];
    i++;
    while (i < formula.length && formula[i] >= 'a' && formula[i] <= 'z') {
      el += formula[i];
      i++;
    }
    return el;
  }

  function readNumber() {
    let num = '';
    while (i < formula.length && formula[i] >= '0' && formula[i] <= '9') {
      num += formula[i];
      i++;
    }
    return num ? parseInt(num) : 1;
  }

  const result = readGroup();
  if (i !== formula.length) throw new Error(`Ошибка разбора на позиции ${i}`);
  return result;
}

function calculate(formula) {
  const counts = parseFormula(formula.trim());
  const breakdown = [];
  let total = 0;

  for (const [el, cnt] of Object.entries(counts)) {
    const mass = ATOMIC_MASSES[el];
    if (mass === undefined) throw new Error(`Элемент "${el}" не найден в таблице`);
    const sub = mass * cnt;
    total += sub;
    breakdown.push({ el, cnt, mass, sub });
  }

  return { total: Math.round(total * 1000) / 1000, breakdown };
}

const EXAMPLES = [
  { f: 'H2O',    name: 'Вода' },
  { f: 'H2SO4',  name: 'Серная кислота' },
  { f: 'NaCl',   name: 'Поваренная соль' },
  { f: 'Ca(OH)2',name: 'Гашёная известь' },
  { f: 'C6H12O6',name: 'Глюкоза' },
  { f: 'Al2(SO4)3',name:'Сульфат алюминия' },
  { f: 'Fe2O3',  name: 'Оксид железа' },
  { f: 'NH3',    name: 'Аммиак' },
];

export default function MolarMassCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleCalc = () => {
    if (!input.trim()) return;
    setError('');
    setResult(null);
    try {
      const res = calculate(input);
      setResult(res);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleExample = (f) => {
    setInput(f);
    setError('');
    setResult(null);
    try {
      setResult(calculate(f));
    } catch (e) {
      setError(e.message);
    }
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleCalc();
  };

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-body font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Химический калькулятор
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Молярная масса вещества
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            Введи химическую формулу — калькулятор мгновенно посчитает молярную массу по данным таблицы Менделеева
          </p>
        </motion.div>

        {/* Input */}
        <div className="bg-background rounded-2xl border border-border p-6 shadow-sm mb-6">
          <label className="block font-body text-sm font-medium text-foreground mb-2">Химическая формула</label>
          <div className="flex gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setError(''); setResult(null); }}
              onKeyDown={handleKey}
              placeholder="Например: H2SO4"
              className="flex-1 border border-border rounded-xl px-4 py-3 font-mono text-lg text-foreground bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary placeholder:text-muted-foreground/50"
            />
            <button
              onClick={handleCalc}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-body font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Считать
            </button>
            {(input || result || error) && (
              <button
                onClick={() => { setInput(''); setResult(null); setError(''); }}
                className="w-12 h-12 flex items-center justify-center rounded-xl border border-border bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Examples */}
          <div className="mt-4">
            <div className="font-body text-xs text-muted-foreground mb-2">Примеры:</div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map(ex => (
                <button
                  key={ex.f}
                  onClick={() => handleExample(ex.f)}
                  className="px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-body font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <span className="font-mono">{ex.f}</span>
                  <span className="text-muted-foreground ml-1">— {ex.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-4 py-3 mb-6 font-body text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-background rounded-2xl border border-primary/30 p-6 shadow-sm"
            >
              {/* Total */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="font-body text-sm text-muted-foreground">Молярная масса</div>
                  <div className="font-heading font-bold text-3xl text-foreground">
                    {result.total} <span className="text-lg font-body font-normal text-muted-foreground">г/моль</span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="font-body text-sm font-medium text-muted-foreground mb-3">Состав формулы:</div>
              <div className="space-y-2">
                {result.breakdown.map(({ el, cnt, mass, sub }) => (
                  <div key={el} className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-heading font-bold text-primary text-sm">{el}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body text-sm font-medium text-foreground">
                        {el} × {cnt}
                      </div>
                      <div className="font-body text-xs text-muted-foreground">
                        {mass} г/моль × {cnt}
                      </div>
                    </div>
                    <div className="font-heading font-bold text-foreground text-base">
                      {Math.round(sub * 1000) / 1000} г/моль
                    </div>
                    <div className="w-16 text-right">
                      <div className="text-xs font-body text-muted-foreground">
                        {Math.round(sub / result.total * 1000) / 10}%
                      </div>
                      <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(sub / result.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-4 text-xs font-body text-muted-foreground text-center">
                Данные взяты из встроенной таблицы Менделеева · Поддерживаются скобки: Ca(OH)₂, Al₂(SO₄)₃
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}