import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, RotateCcw, ChevronLeft, ChevronRight, Beaker, Sparkles, GraduationCap, Trophy, X } from 'lucide-react';

const REACTIONS = [
  // --- БЛОК 1: Классика ---
  {
    id: 1,
    title: 'Кислота + Основание',
    flaskA: { label: 'HCl', name: 'Соляная\nкислота', liquid: '#dbeafe' },
    flaskB: { label: 'NaOH', name: 'Гидроксид\nнатрия', liquid: '#dbeafe' },
    result: {
      liquid: '#dbeafe',
      label: 'NaCl + H₂O',
      name: 'Поваренная соль + Вода',
      equation: 'HCl + NaOH → NaCl + H₂O',
      type: 'Реакция нейтрализации',
      explanation: 'Кислота реагирует с основанием, нейтрализуя друг друга. Образуется соль (хлорид натрия — обычная поваренная соль!) и вода. Раствор становится нейтральным (pH ≈ 7). Реакция сопровождается выделением тепла.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 2,
    title: 'Сода + Уксус',
    flaskA: { label: 'Na₂CO₃', name: 'Сода\n(карбонат натрия)', liquid: '#dbeafe' },
    flaskB: { label: 'CH₃COOH', name: 'Уксусная\nкислота', liquid: '#dbeafe' },
    result: {
      liquid: '#bbf7d0',
      label: 'CO₂↑ + H₂O + CH₃COONa',
      name: 'Углекислый газ + Вода + Ацетат натрия',
      equation: 'Na₂CO₃ + 2CH₃COOH → 2CH₃COONa + H₂O + CO₂↑',
      type: 'Реакция с выделением газа',
      explanation: 'Знаменитая реакция «вулкана»! Выделяется углекислый газ CO₂ — именно он вспенивает смесь. Используется в кулинарии (гашёная сода) и при изготовлении огнетушителей. Пузырьки — это и есть CO₂.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 3,
    title: 'Горение спирта',
    flaskA: { label: 'C₂H₅OH', name: 'Этиловый\nспирт', liquid: '#dbeafe' },
    flaskB: { label: 'O₂', name: 'Кислород\n(воздух)', liquid: '#e0f9ff' },
    result: {
      liquid: '#fde68a',
      label: 'CO₂↑ + H₂O',
      name: 'Углекислый газ + Водяной пар',
      equation: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
      type: 'Реакция горения (окисление)',
      explanation: 'При горении спирта выделяется много тепла и света. Это реакция окисления органики кислородом. Продукты — CO₂ и вода. По этому принципу работают двигатели внутреннего сгорания: топливо сгорает с кислородом воздуха.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 4,
    title: 'Осадок BaSO₄',
    flaskA: { label: 'BaCl₂', name: 'Хлорид\nбария', liquid: '#dbeafe' },
    flaskB: { label: 'Na₂SO₄', name: 'Сульфат\nнатрия', liquid: '#dbeafe' },
    result: {
      liquid: '#e2e8f0',
      label: 'BaSO₄↓ + NaCl',
      name: 'Сульфат бария (осадок) + Хлорид натрия',
      equation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
      type: 'Реакция ионного обмена',
      explanation: 'Образуется белый нерастворимый осадок сульфата бария BaSO₄. Это качественная реакция на сульфат-ион SO₄²⁻: если при добавлении соли бария выпадает белый осадок, значит в растворе есть сульфаты. В медицине BaSO₄ используют для рентгена ЖКТ.',
      bubble: false, precipitate: true,
    },
  },
  {
    id: 5,
    title: 'Fe + Медный купорос',
    flaskA: { label: 'Fe', name: 'Железо\n(металл)', liquid: '#94a3b8' },
    flaskB: { label: 'CuSO₄', name: 'Медный\nкупорос', liquid: '#3b82f6' },
    result: {
      liquid: '#86efac',
      label: 'Cu↓ + FeSO₄',
      name: 'Медь (осадок) + Сульфат железа',
      equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
      type: 'Реакция вытеснения',
      explanation: 'Железо вытесняет медь из раствора — потому что Fe активнее Cu в ряду активности металлов. Гвоздь покрывается красным налётом меди, а синий раствор медного купороса обесцвечивается. Пример действия ряда напряжений металлов!',
      bubble: false, precipitate: true,
      precipitateColor: '#f97316',
    },
  },
  {
    id: 6,
    title: 'Синтез воды',
    flaskA: { label: 'H₂', name: 'Водород\n(газ)', liquid: '#f0fdf4' },
    flaskB: { label: 'O₂', name: 'Кислород\n(газ)', liquid: '#f0f9ff' },
    result: {
      liquid: '#bfdbfe',
      label: 'H₂O',
      name: 'Вода',
      equation: '2H₂ + O₂ → 2H₂O',
      type: 'Реакция соединения (синтез)',
      explanation: 'Два газа — водород и кислород — при поджигании взрывообразно соединяются в воду. Это знаменитый «гремучий газ». Реакция выделяет огромное количество энергии. На этом принципе работают водородные двигатели будущего!',
      bubble: false, precipitate: false,
    },
  },

  // --- БЛОК 2: Осадки ---
  {
    id: 7,
    title: 'Осадок AgCl',
    flaskA: { label: 'AgNO₃', name: 'Нитрат\nсеребра', liquid: '#dbeafe' },
    flaskB: { label: 'NaCl', name: 'Хлорид\nнатрия', liquid: '#dbeafe' },
    result: {
      liquid: '#e2e8f0',
      label: 'AgCl↓ + NaNO₃',
      name: 'Хлорид серебра (осадок)',
      equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
      type: 'Качественная реакция на Cl⁻',
      explanation: 'Белый творожистый осадок хлорида серебра — классическая качественная реакция на хлорид-ион. AgCl нерастворим в воде, но растворяется в аммиаке. Используется в аналитической химии и фотографии (AgCl чувствителен к свету).',
      bubble: false, precipitate: true,
      precipitateColor: 'rgba(240,240,245,0.9)',
    },
  },
  {
    id: 8,
    title: 'Гидроксид меди',
    flaskA: { label: 'CuSO₄', name: 'Медный\nкупорос', liquid: '#3b82f6' },
    flaskB: { label: 'NaOH', name: 'Гидроксид\nнатрия', liquid: '#dbeafe' },
    result: {
      liquid: '#bfdbfe',
      label: 'Cu(OH)₂↓',
      name: 'Гидроксид меди(II) — синий осадок',
      equation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
      type: 'Реакция осаждения',
      explanation: 'Образуется ярко-синий студенистый осадок гидроксида меди. Это качественная реакция на ион Cu²⁺. При нагревании Cu(OH)₂ разлагается в чёрный CuO. Реакция используется также как реактив Фелинга для определения глюкозы.',
      bubble: false, precipitate: true,
      precipitateColor: '#2563eb',
    },
  },
  {
    id: 9,
    title: 'Гидроксид железа',
    flaskA: { label: 'FeCl₃', name: 'Хлорид\nжелеза(III)', liquid: '#fbbf24' },
    flaskB: { label: 'NaOH', name: 'Гидроксид\nнатрия', liquid: '#dbeafe' },
    result: {
      liquid: '#fed7aa',
      label: 'Fe(OH)₃↓',
      name: 'Гидроксид железа(III) — рыжий осадок',
      equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',
      type: 'Реакция осаждения',
      explanation: 'Образуется рыжевато-коричневый осадок гидроксида железа(III). Именно такого цвета ржавчина! Это качественная реакция на ион Fe³⁺. Fe(OH)₃ нерастворим в воде, но растворяется в кислотах.',
      bubble: false, precipitate: true,
      precipitateColor: '#b45309',
    },
  },
  {
    id: 10,
    title: 'Сульфид цинка',
    flaskA: { label: 'ZnSO₄', name: 'Сульфат\nцинка', liquid: '#dbeafe' },
    flaskB: { label: 'Na₂S', name: 'Сульфид\nнатрия', liquid: '#fef9c3' },
    result: {
      liquid: '#e2e8f0',
      label: 'ZnS↓ + Na₂SO₄',
      name: 'Сульфид цинка — белый осадок',
      equation: 'ZnSO₄ + Na₂S → ZnS↓ + Na₂SO₄',
      type: 'Реакция осаждения',
      explanation: 'Образуется белый нерастворимый осадок сульфида цинка ZnS. Это вещество используется как белый пигмент в красках и как люминофор — ZnS светится в темноте после облучения светом!',
      bubble: false, precipitate: true,
      precipitateColor: 'rgba(250,250,230,0.95)',
    },
  },
  {
    id: 11,
    title: 'Иодид свинца',
    flaskA: { label: 'Pb(NO₃)₂', name: 'Нитрат\nсвинца', liquid: '#dbeafe' },
    flaskB: { label: 'KI', name: 'Иодид\nкалия', liquid: '#dbeafe' },
    result: {
      liquid: '#fef08a',
      label: 'PbI₂↓',
      name: 'Иодид свинца — золотой осадок',
      equation: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',
      type: 'Реакция осаждения',
      explanation: 'Образуется ярко-жёлтый кристаллический осадок иодида свинца PbI₂ — одна из красивейших реакций химии! При нагревании осадок растворяется, а при охлаждении выпадают золотистые кристаллы — «золотой дождь».',
      bubble: false, precipitate: true,
      precipitateColor: '#fbbf24',
    },
  },

  // --- БЛОК 3: Газы ---
  {
    id: 12,
    title: 'Мрамор + Кислота',
    flaskA: { label: 'CaCO₃', name: 'Мрамор\n(карбонат Ca)', liquid: '#e2e8f0' },
    flaskB: { label: 'HCl', name: 'Соляная\nкислота', liquid: '#dbeafe' },
    result: {
      liquid: '#dbeafe',
      label: 'CO₂↑ + CaCl₂ + H₂O',
      name: 'Углекислый газ + Хлорид кальция',
      equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
      type: 'Реакция с выделением газа',
      explanation: 'Мрамор и известняк растворяются в соляной кислоте с выделением CO₂. Именно этот процесс разрушает мраморные памятники под действием кислотных дождей. Реакция используется в промышленности для получения CO₂.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 13,
    title: 'Цинк + Кислота',
    flaskA: { label: 'Zn', name: 'Цинк\n(металл)', liquid: '#cbd5e1' },
    flaskB: { label: 'H₂SO₄', name: 'Серная\nкислота', liquid: '#dbeafe' },
    result: {
      liquid: '#dbeafe',
      label: 'H₂↑ + ZnSO₄',
      name: 'Водород + Сульфат цинка',
      equation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑',
      type: 'Реакция вытеснения',
      explanation: 'Цинк вытесняет водород из разбавленной серной кислоты. Это лабораторный способ получения водорода — активный металл реагирует с кислотой. Водород горит синеватым пламенем, а с кислородом образует взрывчатую смесь.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 14,
    title: 'Аммоний + Щёлочь',
    flaskA: { label: 'NH₄Cl', name: 'Хлорид\nаммония', liquid: '#dbeafe' },
    flaskB: { label: 'NaOH', name: 'Щёлочь\n(нагрев)', liquid: '#dbeafe' },
    result: {
      liquid: '#d1fae5',
      label: 'NH₃↑ + NaCl + H₂O',
      name: 'Аммиак + Хлорид натрия',
      equation: 'NH₄Cl + NaOH → NaCl + H₂O + NH₃↑',
      type: 'Получение аммиака',
      explanation: 'При нагревании соли аммония со щёлочью выделяется аммиак NH₃ — газ с резким запахом. Лабораторный способ получения NH₃. Аммиак легче воздуха, хорошо растворяется в воде, образуя щелочной раствор (нашатырный спирт).',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 15,
    title: 'Натрий + Вода',
    flaskA: { label: 'Na', name: 'Натрий\n(металл)', liquid: '#fef3c7' },
    flaskB: { label: 'H₂O', name: 'Вода', liquid: '#bfdbfe' },
    result: {
      liquid: '#dbeafe',
      label: 'NaOH + H₂↑',
      name: 'Гидроксид натрия + Водород',
      equation: '2Na + 2H₂O → 2NaOH + H₂↑',
      type: 'Реакция металла с водой',
      explanation: 'Натрий бурно реагирует с водой — плавает на поверхности, шипит и выделяет водород. Реакция экзотермическая: выделяемого тепла хватает для поджигания H₂. Щелочные металлы (Li, Na, K) реагируют с водой с нарастающей интенсивностью.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 16,
    title: 'Разложение H₂O₂',
    flaskA: { label: 'H₂O₂', name: 'Перекись\nводорода', liquid: '#dbeafe' },
    flaskB: { label: 'MnO₂', name: 'Катализатор\n(MnO₂)', liquid: '#374151' },
    result: {
      liquid: '#bfdbfe',
      label: 'O₂↑ + H₂O',
      name: 'Кислород + Вода',
      equation: '2H₂O₂ → 2H₂O + O₂↑ (кат. MnO₂)',
      type: 'Каталитическое разложение',
      explanation: 'Диоксид марганца ускоряет разложение перекиси водорода в тысячи раз. Выделяется чистый кислород — тлеющая лучинка в этом газе вспыхивает ярким пламенем. Похожая реакция происходит в клетках организма с участием фермента каталазы.',
      bubble: true, precipitate: false,
    },
  },

  // --- БЛОК 4: Цветные реакции ---
  {
    id: 17,
    title: 'Лакмус в кислоте',
    flaskA: { label: 'Лакмус', name: 'Лакмус\n(индикатор)', liquid: '#a78bfa' },
    flaskB: { label: 'HCl', name: 'Соляная\nкислота', liquid: '#dbeafe' },
    result: {
      liquid: '#fca5a5',
      label: 'Красный раствор',
      name: 'Лакмус в кислой среде',
      equation: 'Лакмус + HCl → красный цвет (pH < 7)',
      type: 'Индикаторная реакция',
      explanation: 'Лакмус — природный краситель, меняющий цвет в зависимости от кислотности. В кислой среде (pH < 7) он краснеет. В нейтральной — фиолетовый. В щелочной — синий. Открыт в XIII веке, добывается из лишайников.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 18,
    title: 'Лакмус в щёлочи',
    flaskA: { label: 'Лакмус', name: 'Лакмус\n(индикатор)', liquid: '#a78bfa' },
    flaskB: { label: 'NaOH', name: 'Щёлочь', liquid: '#dbeafe' },
    result: {
      liquid: '#818cf8',
      label: 'Синий раствор',
      name: 'Лакмус в щелочной среде',
      equation: 'Лакмус + NaOH → синий цвет (pH > 7)',
      type: 'Индикаторная реакция',
      explanation: 'В щелочной среде (pH > 7) лакмус становится синим. Это используется для быстрого определения кислотности растворов. Лакмусовая бумага — одно из самых старых химических открытий, применяется в лаборатории до сих пор.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 19,
    title: 'Иод + Крахмал',
    flaskA: { label: 'I₂', name: 'Иод\n(раствор)', liquid: '#fde68a' },
    flaskB: { label: 'Крахмал', name: 'Крахмал\n(раствор)', liquid: '#f9fafb' },
    result: {
      liquid: '#312e81',
      label: 'Тёмно-синий раствор',
      name: 'Иод-крахмальный комплекс',
      equation: 'I₂ + (C₆H₁₀O₅)ₙ → синий комплекс',
      type: 'Качественная реакция на крахмал',
      explanation: 'Иод даёт тёмно-синее окрашивание с крахмалом — одна из самых известных качественных реакций. Молекулы иода встраиваются внутрь спиральных цепочек крахмала. При нагревании цвет исчезает (реакция обратима).',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 20,
    title: 'Хромат → Дихромат',
    flaskA: { label: 'K₂CrO₄', name: 'Хромат\nкалия', liquid: '#fde68a' },
    flaskB: { label: 'H₂SO₄', name: 'Серная\nкислота', liquid: '#dbeafe' },
    result: {
      liquid: '#f97316',
      label: 'K₂Cr₂O₇',
      name: 'Дихромат калия — оранжевый',
      equation: '2K₂CrO₄ + H₂SO₄ → K₂Cr₂O₇ + K₂SO₄ + H₂O',
      type: 'Обратимая реакция равновесия',
      explanation: 'Жёлтый хромат превращается в оранжевый дихромат при подкислении. Реакция обратима: добавление щёлочи возвращает жёлтый цвет. Оба соединения хрома(VI) токсичны и используются как окислители в органическом синтезе.',
      bubble: false, precipitate: false,
    },
  },

  // --- БЛОК 5: Органика ---
  {
    id: 21,
    title: 'Бромирование алкена',
    flaskA: { label: 'CH₂=CH₂', name: 'Этилен\n(алкен)', liquid: '#f0fdf4' },
    flaskB: { label: 'Br₂', name: 'Бромная\nвода', liquid: '#fbbf24' },
    result: {
      liquid: '#dbeafe',
      label: 'CH₂Br–CH₂Br',
      name: 'Дибромэтан — бромная вода обесцвечивается',
      equation: 'CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br',
      type: 'Реакция присоединения',
      explanation: 'Алкены обесцвечивают бромную воду — это качественная реакция на двойную связь C=C. Бром присоединяется по двойной связи. Жёлто-бурая бромная вода становится бесцветной. Так обнаруживают ненасыщенные органические соединения.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 22,
    title: 'Горение метана',
    flaskA: { label: 'CH₄', name: 'Метан\n(природный газ)', liquid: '#f0f9ff' },
    flaskB: { label: 'O₂', name: 'Кислород\n(воздух)', liquid: '#e0f9ff' },
    result: {
      liquid: '#fde68a',
      label: 'CO₂↑ + H₂O',
      name: 'Углекислый газ + Вода',
      equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      type: 'Реакция горения',
      explanation: 'Сгорание метана — самая распространённая реакция горения в быту. Именно это происходит в газовых плитах! Горение полное (с достаточным O₂) даёт CO₂ и воду. При недостатке кислорода образуется угарный газ CO — опасный яд.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 23,
    title: 'Мыло: омыление',
    flaskA: { label: 'Жир', name: 'Растительное\nмасло (триглицерид)', liquid: '#fef9c3' },
    flaskB: { label: 'NaOH', name: 'Щёлочь\n(конц.)', liquid: '#dbeafe' },
    result: {
      liquid: '#f9fafb',
      label: 'Мыло + Глицерин',
      name: 'Мыло (соли жирных кислот) + Глицерин',
      equation: 'Жир + 3NaOH → мыло + C₃H₅(OH)₃',
      type: 'Реакция омыления',
      explanation: 'Омыление — древнейшая химическая реакция, используемая человечеством тысячелетия. Жиры реагируют со щёлочью, образуя мыло (соли жирных кислот) и глицерин. Мыло работает как поверхностно-активное вещество, удаляя жирные загрязнения.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 24,
    title: 'Глюкоза + Cu(OH)₂',
    flaskA: { label: 'C₆H₁₂O₆', name: 'Глюкоза\n(раствор)', liquid: '#fef9c3' },
    flaskB: { label: 'Cu(OH)₂', name: 'Гидроксид\nмеди(II)', liquid: '#3b82f6' },
    result: {
      liquid: '#fde68a',
      label: 'Cu₂O↓ + Глюконовая к-та',
      name: 'Оксид меди(I) — кирпичный осадок',
      equation: 'C₆H₁₂O₆ + 2Cu(OH)₂ → Cu₂O↓ + C₆H₁₂O₇ + 2H₂O',
      type: 'Качественная реакция на альдегид',
      explanation: 'Глюкоза восстанавливает голубой Cu(OH)₂ до кирпично-красного Cu₂O — это качественная реакция на альдегидную группу. Реакция Фелинга используется в медицине для обнаружения сахара в моче при диагностике диабета.',
      bubble: false, precipitate: true,
      precipitateColor: '#b45309',
    },
  },

  // --- БЛОК 6: Неорганика / ЕГЭ ---
  {
    id: 25,
    title: 'Разложение CaCO₃',
    flaskA: { label: 'CaCO₃', name: 'Карбонат\nкальция (нагрев)', liquid: '#e2e8f0' },
    flaskB: { label: 'Δ', name: 'Нагревание\n(термолиз)', liquid: '#fde68a' },
    result: {
      liquid: '#f9fafb',
      label: 'CaO + CO₂↑',
      name: 'Оксид кальция + Углекислый газ',
      equation: 'CaCO₃ → CaO + CO₂↑ (t > 900°C)',
      type: 'Термическое разложение',
      explanation: 'При сильном нагревании известняк разлагается в известь (CaO) и углекислый газ. Это основа производства цемента и стекла! CaO — «негашёная известь» — бурно реагирует с водой, выделяя много тепла.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 26,
    title: 'Алюминий + Щёлочь',
    flaskA: { label: 'Al', name: 'Алюминий\n(металл)', liquid: '#cbd5e1' },
    flaskB: { label: 'NaOH', name: 'Щёлочь\n(раствор)', liquid: '#dbeafe' },
    result: {
      liquid: '#dbeafe',
      label: 'NaAlO₂ + H₂↑',
      name: 'Алюминат натрия + Водород',
      equation: '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑',
      type: 'Амфотерность алюминия',
      explanation: 'Алюминий — амфотерный металл: реагирует и с кислотами, и со щелочами. Это его уникальное свойство. Именно поэтому нельзя хранить щелочные продукты (например, соду) в алюминиевой посуде надолго.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 27,
    title: 'Термит',
    flaskA: { label: 'Al', name: 'Порошок\nалюминия', liquid: '#cbd5e1' },
    flaskB: { label: 'Fe₂O₃', name: 'Оксид\nжелеза(III)', liquid: '#b45309' },
    result: {
      liquid: '#fbbf24',
      label: 'Al₂O₃ + Fe',
      name: 'Оксид алюминия + расплавленное железо',
      equation: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
      type: 'Алюминотермия',
      explanation: 'Термитная реакция выделяет колоссальное количество тепла (>2000°C) — железо образуется в расплавленном виде! Алюминий как более активный металл восстанавливает железо из оксида. Используется для сварки рельсов и в военной технике.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 28,
    title: 'Хлор + вода',
    flaskA: { label: 'Cl₂', name: 'Хлор\n(газ)', liquid: '#d9f99d' },
    flaskB: { label: 'H₂O', name: 'Вода', liquid: '#bfdbfe' },
    result: {
      liquid: '#ecfccb',
      label: 'HCl + HClO',
      name: 'Соляная кислота + Хлорноватистая кислота',
      equation: 'Cl₂ + H₂O ⇌ HCl + HClO',
      type: 'Реакция диспропорционирования',
      explanation: 'Хлор реагирует с водой с образованием двух кислот. HClO — хлорноватистая кислота — сильный окислитель, убивающий бактерии. Именно поэтому хлор используют для обеззараживания питьевой воды и в бассейнах.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 29,
    title: 'Осадок Cr(OH)₃',
    flaskA: { label: 'CrCl₃', name: 'Хлорид\nхрома(III)', liquid: '#6ee7b7' },
    flaskB: { label: 'NaOH', name: 'Щёлочь\n(немного)', liquid: '#dbeafe' },
    result: {
      liquid: '#d1fae5',
      label: 'Cr(OH)₃↓',
      name: 'Гидроксид хрома(III) — серо-зелёный',
      equation: 'CrCl₃ + 3NaOH → Cr(OH)₃↓ + 3NaCl',
      type: 'Реакция осаждения (амфотерный)',
      explanation: 'Выпадает серо-зелёный осадок Cr(OH)₃. Хром(III) — амфотерный элемент: его гидроксид реагирует и с кислотой, и с избытком щёлочи (давая зелёный хромит). Хром придаёт зелёный цвет изумрудам и рубинам (в малых количествах).',
      bubble: false, precipitate: true,
      precipitateColor: '#4ade80',
    },
  },
  {
    id: 30,
    title: 'Нитрат + нагрев',
    flaskA: { label: 'KNO₃', name: 'Нитрат\nкалия (нагрев)', liquid: '#dbeafe' },
    flaskB: { label: 'Δ', name: 'Нагревание', liquid: '#fde68a' },
    result: {
      liquid: '#dbeafe',
      label: 'KNO₂ + O₂↑',
      name: 'Нитрит калия + Кислород',
      equation: '2KNO₃ → 2KNO₂ + O₂↑ (t°)',
      type: 'Термическое разложение',
      explanation: 'Нитраты щелочных металлов при нагревании разлагаются с выделением кислорода. Это основа пороха и фейерверков! KNO₃ (селитра) + сера + уголь = чёрный порох. Выделяющийся кислород поддерживает горение.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 31,
    title: 'Серебряное зеркало',
    flaskA: { label: 'HCHO', name: 'Формальдегид\n(альдегид)', liquid: '#dbeafe' },
    flaskB: { label: 'Ag(NH₃)₂⁺', name: 'Реактив\nТоллена', liquid: '#dbeafe' },
    result: {
      liquid: '#dbeafe',
      label: 'Ag↓ + HCOOH',
      name: 'Серебро (зеркало на стенках)',
      equation: 'HCHO + 2[Ag(NH₃)₂]OH → 2Ag↓ + HCOONH₄ + ...',
      type: 'Реакция серебряного зеркала',
      explanation: 'Альдегиды восстанавливают ион серебра Ag⁺ до металлического серебра, которое осаждается на стенках пробирки блестящим зеркальным слоем. Это качественная реакция на альдегиды. По этому принципу раньше изготавливали зеркала!',
      bubble: false, precipitate: true,
      precipitateColor: 'rgba(200,200,210,0.95)',
    },
  },
  {
    id: 32,
    title: 'Гашение извести',
    flaskA: { label: 'CaO', name: 'Негашёная\nизвесть', liquid: '#f9fafb' },
    flaskB: { label: 'H₂O', name: 'Вода', liquid: '#bfdbfe' },
    result: {
      liquid: '#f1f5f9',
      label: 'Ca(OH)₂',
      name: 'Гашёная известь (известковое молоко)',
      equation: 'CaO + H₂O → Ca(OH)₂ + Q',
      type: 'Экзотермическая реакция',
      explanation: 'CaO бурно реагирует с водой, выделяя огромное количество тепла — смесь буквально кипит. Образуется Ca(OH)₂ — гашёная известь. Используется в строительстве (побелка), сельском хозяйстве (раскисление почв) и очистке воды.',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 33,
    title: 'Фосфор + Кислород',
    flaskA: { label: 'P₄', name: 'Белый\nфосфор', liquid: '#fef9c3' },
    flaskB: { label: 'O₂', name: 'Кислород', liquid: '#e0f9ff' },
    result: {
      liquid: '#f9fafb',
      label: 'P₄O₁₀',
      name: 'Оксид фосфора(V) — белый дым',
      equation: 'P₄ + 5O₂ → P₄O₁₀',
      type: 'Реакция горения',
      explanation: 'Белый фосфор самовоспламеняется на воздухе при комнатной температуре, образуя густой белый дым P₄O₁₀. Белый фосфор чрезвычайно токсичен. Красный фосфор (в спичках) значительно безопаснее и не самовоспламеняется.',
      bubble: true, precipitate: false,
    },
  },
  {
    id: 34,
    title: 'Реакция Белоусова',
    flaskA: { label: 'BrO₃⁻', name: 'Бромат +\nмалоновая к-та', liquid: '#fde68a' },
    flaskB: { label: 'Ce³⁺', name: 'Катализатор\n(Ce³⁺/Ce⁴⁺)', liquid: '#fef9c3' },
    result: {
      liquid: '#f97316',
      label: 'Колебательная р-я',
      name: 'Цвет меняется периодически: жёлтый ↔ бесцветный',
      equation: 'BrO₃⁻ + CH₂(COOH)₂ + Ce³⁺ → (колебания)',
      type: 'Химический осциллятор',
      explanation: 'Реакция Белоусова-Жаботинского — пример «химических часов». Цвет раствора ритмично меняется минутами. Это нелинейная динамика: химическая система, далёкая от равновесия. Модель для понимания биологических ритмов (сердечные сокращения, нейронная активность).',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 35,
    title: 'Сульфат меди + Fe',
    flaskA: { label: 'FeSO₄', name: 'Сульфат\nжелеза(II)', liquid: '#86efac' },
    flaskB: { label: 'KMnO₄', name: 'Перманганат\nкалия', liquid: '#7e22ce' },
    result: {
      liquid: '#fde68a',
      label: 'MnSO₄ + Fe₂(SO₄)₃',
      name: 'Обесцвечивание перманганата',
      equation: '10FeSO₄ + 2KMnO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + 2MnSO₄ + K₂SO₄ + 8H₂O',
      type: 'Окислительно-восстановительная р-я',
      explanation: 'Ярко-фиолетовый перманганат калия KMnO₄ обесцвечивается при реакции с Fe²⁺ в кислой среде. Mn⁷⁺ восстанавливается до бесцветного Mn²⁺, а Fe²⁺ окисляется до Fe³⁺. Это классическая ОВР, используемая в аналитическом титровании (перманганатометрия).',
      bubble: false, precipitate: false,
    },
  },
  {
    id: 36,
    title: 'Полимеризация этилена',
    flaskA: { label: 'nCH₂=CH₂', name: 'Этилен\n(мономер)', liquid: '#f0fdf4' },
    flaskB: { label: 'кат.', name: 'Катализатор\n(давление)', liquid: '#cbd5e1' },
    result: {
      liquid: '#e2e8f0',
      label: '(–CH₂–CH₂–)ₙ',
      name: 'Полиэтилен',
      equation: 'n CH₂=CH₂ → (–CH₂–CH₂–)ₙ',
      type: 'Реакция полимеризации',
      explanation: 'Тысячи молекул этилена соединяются в длинную цепочку — полиэтилен. Это самый распространённый пластик в мире! Пакеты, бутылки, трубы — всё это полиэтилен. При изменении условий синтеза получают разные виды: LDPE, HDPE, UHMWPE.',
      bubble: false, precipitate: false,
    },
  },
];


function Flask({ data, label, pouring = false, size = 'md' }) {
  const w = size === 'lg' ? 80 : 64;
  const h = size === 'lg' ? 110 : 90;
  const clipId = `clip-${label.replace(/[^a-zA-Z0-9]/g, '_')}`;

  return (
    <motion.div
      animate={pouring ? { rotate: -55, x: 18, y: -12 } : { rotate: 0, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      style={{ width: w, height: h, position: 'relative' }}
    >
      <svg viewBox="0 0 80 110" width={w} height={h}>
        <defs>
          <clipPath id={clipId}>
            <path d="M28 8 L28 42 L8 88 Q4 98 12 104 Q20 110 40 110 Q60 110 68 104 Q76 98 72 88 L52 42 L52 8 Z" />
          </clipPath>
        </defs>
        {/* Liquid */}
        <rect x="0" y="50" width="80" height="65" fill={data.liquid} clipPath={`url(#${clipId})`} opacity="0.9" />
        {/* Flask outline */}
        <path
          d="M28 8 L28 42 L8 88 Q4 98 12 104 Q20 110 40 110 Q60 110 68 104 Q76 98 72 88 L52 42 L52 8 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        {/* Flask neck */}
        <rect x="26" y="2" width="28" height="10" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        {/* Shine */}
        <line x1="33" y1="55" x2="30" y2="95" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
        {/* Label */}
        <text x="40" y="82" textAnchor="middle" fontSize="9" fontWeight="bold" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif">
          {label}
        </text>
      </svg>
    </motion.div>
  );
}

function ResultFlask({ data }) {
  const clipId = 'clip-result-flask';
  const precipColor = data.precipitateColor || 'rgba(255,255,255,0.85)';
  const bubblePositions = [
    { cx: 30, delay: 0 }, { cx: 40, delay: 0.25 }, { cx: 50, delay: 0.5 },
    { cx: 35, delay: 0.75 }, { cx: 45, delay: 1.0 },
  ];

  return (
    <div style={{ position: 'relative', width: 96, height: 150 }}>
      {/* Bubbles rising OUT of the neck — above the svg */}
      {data.bubble && bubblePositions.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: 10, opacity: 0, scale: 0.4 }}
          animate={{ y: -30, opacity: [0, 0.8, 0], scale: [0.4, 1, 0.3] }}
          transition={{ delay: b.delay, duration: 1.1, repeat: Infinity, repeatDelay: 0.3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: b.cx * (96 / 80),
            top: 0,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
            pointerEvents: 'none',
          }}
        />
      ))}

      <svg viewBox="0 0 80 110" width="96" height="130" style={{ position: 'absolute', top: 20 }}>
        <defs>
          <clipPath id={clipId}>
            <path d="M28 8 L28 42 L8 88 Q4 98 12 104 Q20 110 40 110 Q60 110 68 104 Q76 98 72 88 L52 42 L52 8 Z" />
          </clipPath>
        </defs>

        {/* Liquid body */}
        <rect x="0" y="45" width="80" height="70" fill={data.liquid} clipPath={`url(#${clipId})`} opacity="0.9" />

        {/* Animated precipitate settling to bottom */}
        {data.precipitate && (
          <>
            {/* Settling particles */}
            {[
              { cx: 22, startY: 60, r: 3 },
              { cx: 38, startY: 55, r: 2.5 },
              { cx: 53, startY: 65, r: 3.5 },
              { cx: 30, startY: 70, r: 2 },
              { cx: 48, startY: 58, r: 2 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.cx}
                r={p.r}
                initial={{ cy: p.startY, opacity: 0 }}
                animate={{ cy: 100, opacity: [0, 0.9, 0.9, 0] }}
                transition={{ delay: i * 0.18, duration: 1.4, ease: 'easeIn' }}
                fill={precipColor}
                clipPath={`url(#${clipId})`}
              />
            ))}
            {/* Settled layer at bottom */}
            <motion.rect
              x="8" y="99" width="64" height="8"
              rx="2"
              fill={precipColor}
              clipPath={`url(#${clipId})`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              style={{ transformOrigin: 'bottom' }}
            />
          </>
        )}

        {/* Flask outline */}
        <path
          d="M28 8 L28 42 L8 88 Q4 98 12 104 Q20 110 40 110 Q60 110 68 104 Q76 98 72 88 L52 42 L52 8 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
        {/* Flask neck */}
        <rect x="26" y="2" width="28" height="10" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        {/* Shine */}
        <line x1="33" y1="55" x2="30" y2="95" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />

        {/* Bubbles inside liquid */}
        {data.bubble && [
          { cx: 25, startY: 90, delay: 0.1 },
          { cx: 45, startY: 85, delay: 0.4 },
          { cx: 58, startY: 88, delay: 0.7 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            r={3}
            initial={{ cy: b.startY, opacity: 0 }}
            animate={{ cy: [b.startY, b.startY - 30], opacity: [0, 0.7, 0] }}
            transition={{ delay: b.delay, duration: 0.9, repeat: Infinity, repeatDelay: 0.6 }}
            fill="rgba(255,255,255,0.5)"
            clipPath={`url(#${clipId})`}
          />
        ))}
      </svg>
    </div>
  );
}

// Генерируем 4 варианта ответа для экзамена (1 правильный + 3 случайных)
function getExamOptions(reaction, allReactions) {
  const correct = reaction.result.type;
  const others = allReactions
    .map(r => r.result.type)
    .filter(t => t !== correct);
  // перемешиваем и берём 3
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
  const all = [correct, ...shuffled].sort(() => Math.random() - 0.5);
  return { options: all, correct };
}

function ExamMode({ reactions, onExit }) {
  const TOTAL = 10;
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null); // null | string
  const [finished, setFinished] = useState(false);

  // Случайный порядок вопросов
  const questions = useMemo(() =>
    [...reactions].sort(() => Math.random() - 0.5).slice(0, TOTAL),
  []);

  const { options, correct } = useMemo(() =>
    getExamOptions(questions[qIdx], reactions),
  [qIdx, questions]);

  const handleAnswer = (opt) => {
    if (chosen !== null) return;
    setChosen(opt);
    if (opt === correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setQIdx(i => i + 1);
      setChosen(null);
    }
  };

  if (finished) {
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <Trophy className={`w-16 h-16 ${pct >= 70 ? 'text-yellow-400' : 'text-muted-foreground'}`} />
        <h3 className="font-heading font-bold text-2xl text-white">Результат</h3>
        <div className="text-5xl font-heading font-bold text-white">{score}<span className="text-white/40 text-2xl">/{TOTAL}</span></div>
        <div className={`text-lg font-body font-semibold px-4 py-2 rounded-full ${pct >= 70 ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-400'}`}>
          {pct >= 90 ? '🏆 Отлично! Химик-профессионал' : pct >= 70 ? '✅ Хорошо! Можно лучше' : '📚 Нужно повторить материал'}
        </div>
        <div className="flex gap-3">
          <button onClick={onExit} className="flex items-center gap-2 bg-white/10 text-white/80 hover:bg-white/20 px-6 py-3 rounded-full font-body font-medium text-sm transition-colors cursor-pointer">
            <X className="w-4 h-4" /> Выйти
          </button>
        </div>
      </div>
    );
  }

  const q = questions[qIdx];

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Progress */}
      <div className="flex items-center justify-between w-full max-w-md">
        <span className="font-body text-white/60 text-sm">Вопрос {qIdx + 1} из {TOTAL}</span>
        <span className="font-body text-primary font-semibold text-sm">Счёт: {score}</span>
      </div>
      <div className="w-full max-w-md bg-white/10 rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((qIdx) / TOTAL) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center w-full max-w-md">
        <div className="font-body text-white/60 text-xs mb-1">Определи тип реакции:</div>
        <div className="font-heading font-bold text-white text-lg">{q.flaskA.label} + {q.flaskB.label}</div>
        <div className="font-body font-mono text-white/70 text-sm mt-1">{q.result.equation}</div>
      </div>

      {/* Flasks preview */}
      <div className="flex items-end justify-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <Flask data={q.flaskA} label={q.flaskA.label} />
          <span className="text-white/60 text-xs font-body">{q.flaskA.label}</span>
        </div>
        <span className="text-white/40 text-2xl pb-10">+</span>
        <div className="flex flex-col items-center gap-1">
          <Flask data={q.flaskB} label={q.flaskB.label} />
          <span className="text-white/60 text-xs font-body">{q.flaskB.label}</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        {options.map((opt) => {
          let cls = 'bg-white/10 text-white hover:bg-white/20 border border-white/10';
          if (chosen !== null) {
            if (opt === correct) cls = 'bg-primary/30 text-primary border border-primary';
            else if (opt === chosen) cls = 'bg-red-500/30 text-red-300 border border-red-500/50';
            else cls = 'bg-white/5 text-white/40 border border-white/5';
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`px-4 py-3 rounded-xl font-body text-sm font-medium transition-all text-left cursor-pointer ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {chosen !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-md rounded-xl px-4 py-3 text-sm font-body ${chosen === correct ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-300'}`}
          >
            {chosen === correct ? '✅ Правильно! ' : `❌ Неверно. Правильный ответ: ${correct}. `}
            <span className="opacity-80">{q.result.explanation.slice(0, 80)}…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {chosen !== null && (
        <button onClick={handleNext} className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity">
          {qIdx + 1 >= TOTAL ? 'Завершить' : 'Следующий →'}
        </button>
      )}

      <button onClick={onExit} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-body transition-colors cursor-pointer">
        <X className="w-3 h-3" /> Выйти из режима экзамена
      </button>
    </div>
  );
}

export default function ReactionGameSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | pouring | reacted
  const [examMode, setExamMode] = useState(false);

  const reaction = REACTIONS[activeIdx];

  const handleMix = () => {
    if (phase !== 'idle') return;
    setPhase('pouring');
    setTimeout(() => setPhase('reacted'), 900);
  };

  const handleReset = useCallback(() => {
    setPhase('idle');
  }, []);

  const changeReaction = useCallback((newIdx) => {
    setPhase('idle');
    setActiveIdx(newIdx);
  }, []);

  const prev = () => changeReaction((activeIdx - 1 + REACTIONS.length) % REACTIONS.length);
  const next = () => changeReaction((activeIdx + 1) % REACTIONS.length);

  return (
    <section id="lab" className="py-20 lg:py-28 bg-card overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-body font-medium mb-4">
            <Beaker className="w-4 h-4" />
            Интерактивная лаборатория
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Смешай реагенты и узнай результат
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Нажми на кнопку — увидишь реакцию и объяснение, как будто ты в настоящей лаборатории
          </p>
        </motion.div>

        {/* Mode tabs */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setExamMode(false)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body font-semibold transition-all ${!examMode ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-background border border-border text-muted-foreground hover:border-primary/40'}`}
          >
            <Beaker className="w-4 h-4" /> Лаборатория
          </button>
          <button
            onClick={() => setExamMode(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body font-semibold transition-all ${examMode ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20' : 'bg-background border border-border text-muted-foreground hover:border-accent/40'}`}
          >
            <GraduationCap className="w-4 h-4" /> Режим экзамена
          </button>
        </div>

        {!examMode && (
          /* Reaction selector pills */
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {REACTIONS.map((r, i) => (
              <button
                key={r.id}
                onClick={() => changeReaction(i)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                  activeIdx === i
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {r.title}
              </button>
            ))}
          </div>
        )}

        {/* Lab area */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 lg:p-10 overflow-hidden shadow-2xl">
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px)' }} />

          {examMode ? (
            <ExamMode key={examMode} reactions={REACTIONS} onExit={() => setExamMode(false)} />
          ) : (
            <>
              {/* Nav arrows */}
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-6">
                {/* Equation chip */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-2 text-center">
                  <span className="font-body font-mono text-white text-sm lg:text-base">
                    {reaction.result.equation}
                  </span>
                </div>

                {/* Flasks row */}
                <div className="flex items-end justify-center gap-4 lg:gap-8 min-h-[170px]">
                  <div className="flex flex-col items-center gap-2">
                    <Flask data={reaction.flaskA} label={reaction.flaskA.label} pouring={phase === 'pouring' || phase === 'reacted'} />
                    <div className="text-center">
                      <div className="font-heading font-bold text-white text-xs">{reaction.flaskA.label}</div>
                      <div className="font-body text-white/60 text-xs whitespace-pre-line leading-tight">{reaction.flaskA.name}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center pb-14">
                    <AnimatePresence mode="wait">
                      {phase === 'idle' ? (
                        <motion.span key="plus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white/40 text-3xl font-light">+</motion.span>
                      ) : (
                        <motion.span key="arrow" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-primary text-2xl">→</motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Flask data={reaction.flaskB} label={reaction.flaskB.label} />
                    <div className="text-center">
                      <div className="font-heading font-bold text-white text-xs">{reaction.flaskB.label}</div>
                      <div className="font-body text-white/60 text-xs whitespace-pre-line leading-tight">{reaction.flaskB.name}</div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {phase === 'reacted' && (
                      <>
                        <motion.span key="eq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center pb-14 text-white/40 text-3xl font-light">=</motion.span>
                        <motion.div key="result" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }} className="flex flex-col items-center gap-2">
                          <ResultFlask data={reaction.result} />
                          <div className="font-heading font-bold text-white text-xs text-center max-w-[100px]">{reaction.result.label}</div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {phase === 'idle' ? (
                  <button onClick={handleMix} className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-semibold text-base shadow-lg shadow-primary/30 hover:opacity-90 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none">
                    <Sparkles className="w-5 h-5" />
                    Смешать реагенты!
                  </button>
                ) : (
                  <button onClick={handleReset} className="flex items-center gap-2 bg-white/10 text-white/80 hover:bg-white/20 px-6 py-3 rounded-full font-body font-medium text-sm transition-colors cursor-pointer">
                    <RotateCcw className="w-4 h-4" />
                    Сбросить
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Explanation card — only in lab mode */}
        {!examMode && (
          <AnimatePresence>
            {phase === 'reacted' && (
              <motion.div
                key={reaction.id + '-explain'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-background rounded-2xl p-6 lg:p-8 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-heading font-bold text-foreground text-lg">{reaction.result.name}</span>
                      <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-3 py-1 rounded-full">{reaction.result.type}</span>
                    </div>
                    <p className="font-body text-muted-foreground leading-relaxed">{reaction.result.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Dot indicators — only in lab mode */}
        {!examMode && (
          <div className="flex justify-center gap-2 mt-6">
            {REACTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => changeReaction(i)}
                className={`h-2 rounded-full transition-all ${i === activeIdx ? 'bg-primary w-6' : 'bg-border w-2'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}