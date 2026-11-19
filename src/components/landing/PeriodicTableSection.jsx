import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Layers } from 'lucide-react';

// Полные электронные конфигурации для всех 118 элементов (без сокращений)
const CONFIGS = {
  1:  '1s¹',
  2:  '1s²',
  3:  '1s² 2s¹',
  4:  '1s² 2s²',
  5:  '1s² 2s² 2p¹',
  6:  '1s² 2s² 2p²',
  7:  '1s² 2s² 2p³',
  8:  '1s² 2s² 2p⁴',
  9:  '1s² 2s² 2p⁵',
  10: '1s² 2s² 2p⁶',
  11: '1s² 2s² 2p⁶ 3s¹',
  12: '1s² 2s² 2p⁶ 3s²',
  13: '1s² 2s² 2p⁶ 3s² 3p¹',
  14: '1s² 2s² 2p⁶ 3s² 3p²',
  15: '1s² 2s² 2p⁶ 3s² 3p³',
  16: '1s² 2s² 2p⁶ 3s² 3p⁴',
  17: '1s² 2s² 2p⁶ 3s² 3p⁵',
  18: '1s² 2s² 2p⁶ 3s² 3p⁶',
  19: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',
  20: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²',
  21: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²',
  22: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²',
  23: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²',
  24: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹',
  25: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²',
  26: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²',
  27: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ 4s²',
  28: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸ 4s²',
  29: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹',
  30: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²',
  31: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p¹',
  32: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p²',
  33: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p³',
  34: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴',
  35: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵',
  36: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶',
  37: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s¹',
  38: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s²',
  39: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹ 5s²',
  40: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d² 5s²',
  41: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁴ 5s¹',
  42: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s¹',
  43: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s²',
  44: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁷ 5s¹',
  45: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁸ 5s¹',
  46: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰',
  47: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s¹',
  48: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s²',
  49: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p¹',
  50: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p²',
  51: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p³',
  52: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁴',
  53: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁵',
  54: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶',
  55: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s¹',
  56: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s²',
  57: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 5d¹ 6s²',
  58: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹ 5s² 5p⁶ 5d¹ 6s²',
  59: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f³ 5s² 5p⁶ 6s²',
  60: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁴ 5s² 5p⁶ 6s²',
  61: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁵ 5s² 5p⁶ 6s²',
  62: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁶ 5s² 5p⁶ 6s²',
  63: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁷ 5s² 5p⁶ 6s²',
  64: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁷ 5s² 5p⁶ 5d¹ 6s²',
  65: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁹ 5s² 5p⁶ 6s²',
  66: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁰ 5s² 5p⁶ 6s²',
  67: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹¹ 5s² 5p⁶ 6s²',
  68: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹² 5s² 5p⁶ 6s²',
  69: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹³ 5s² 5p⁶ 6s²',
  70: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 6s²',
  71: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹ 6s²',
  72: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d² 6s²',
  73: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d³ 6s²',
  74: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁴ 6s²',
  75: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁵ 6s²',
  76: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁶ 6s²',
  77: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁷ 6s²',
  78: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁹ 6s¹',
  79: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s¹',
  80: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s²',
  81: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p¹',
  82: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p²',
  83: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p³',
  84: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁴',
  85: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁵',
  86: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶',
  87: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 7s¹',
  88: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 7s²',
  89: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d¹ 7s²',
  90: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d² 7s²',
  91: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f² 6s² 6p⁶ 6d¹ 7s²',
  92: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f³ 6s² 6p⁶ 6d¹ 7s²',
  93: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁴ 6s² 6p⁶ 6d¹ 7s²',
  94: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁶ 6s² 6p⁶ 7s²',
  95: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁷ 6s² 6p⁶ 7s²',
  96: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁷ 6s² 6p⁶ 6d¹ 7s²',
  97: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁹ 6s² 6p⁶ 7s²',
  98: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁰ 6s² 6p⁶ 7s²',
  99: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹¹ 6s² 6p⁶ 7s²',
  100:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹² 6s² 6p⁶ 7s²',
  101:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹³ 6s² 6p⁶ 7s²',
  102:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 7s²',
  103:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 7s² 7p¹',
  104:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d² 7s²',
  105:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d³ 7s²',
  106:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁴ 7s²',
  107:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁵ 7s²',
  108:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁶ 7s²',
  109:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁷ 7s²',
  110:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁸ 7s²',
  111:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s¹',
  112:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s²',
  113:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p¹',
  114:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p²',
  115:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p³',
  116:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁴',
  117:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁵',
  118:'1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁶',
};

// Разбиваем конфигурацию на подоболочки для SVG-отображения
function parseConfig(cfg) {
  if (!cfg) return [];
  // убираем [He]/[Ne]/... префикс, оставляем явные оболочки
  const clean = cfg.replace(/\[[A-Za-z]+\]\s*/, '');
  if (!clean) return [];
  const parts = clean.split(/\s+/).filter(Boolean);
  return parts.map(p => {
    const m = p.match(/^(\d+)([spdf])([¹²³⁴⁵⁶⁷⁸⁹¹⁰]+)$/);
    if (!m) return null;
    const count = m[3].replace(/[¹]/g,'1').replace(/[²]/g,'2').replace(/[³]/g,'3')
      .replace(/[⁴]/g,'4').replace(/[⁵]/g,'5').replace(/[⁶]/g,'6')
      .replace(/[⁷]/g,'7').replace(/[⁸]/g,'8').replace(/[⁹]/g,'9')
      .replace(/¹⁰/g,'10').replace(/¹¹/g,'11').replace(/¹²/g,'12')
      .replace(/¹³/g,'13').replace(/¹⁴/g,'14');
    return { shell: m[1], type: m[2], count: parseInt(count) };
  }).filter(Boolean);
}

// SVG-диаграмма орбиталей (упрощённая, красивая)
function OrbitalDiagram({ n }) {
  const cfg = CONFIGS[n] || '';
  const parts = parseConfig(cfg);
  if (!parts.length) return null;

  const typeColors = { s: '#6366f1', p: '#22c55e', d: '#f59e0b', f: '#ec4899' };
  const maxEl = { s: 2, p: 6, d: 10, f: 14 };

  return (
    <div className="mt-4">
      <div className="text-xs font-body text-muted-foreground mb-2 font-medium">Электронная конфигурация:</div>
      <div className="font-mono text-sm font-semibold text-foreground bg-muted/50 rounded-lg px-3 py-2 mb-3 break-all">
        {cfg}
      </div>
      <div className="text-xs font-body text-muted-foreground mb-2">Заполнение орбиталей:</div>
      <div className="flex flex-wrap gap-2">
        {parts.map((p, i) => {
          const max = maxEl[p.type] || 2;
          const filled = Math.min(p.count, max);
          const pct = Math.round((filled / max) * 100);
          const color = typeColors[p.type] || '#94a3b8';
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-[10px] font-body font-medium text-muted-foreground">{p.shell}{p.type}</div>
              <div className="relative w-8 h-16 bg-muted rounded-md overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-md transition-all"
                  style={{ height: `${pct}%`, background: color, opacity: 0.85 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white drop-shadow">{p.count}</span>
                </div>
              </div>
              <div className="text-[9px] font-body text-muted-foreground">{filled}/{max}</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {[['s','#6366f1'],['p','#22c55e'],['d','#f59e0b'],['f','#ec4899']].map(([t,c]) => (
          <div key={t} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ background: c }} />
            <span className="text-[9px] font-body text-muted-foreground">{t}-орбиталь</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Исправленные категории (проверено):
// Неметаллы (nonmetal): H, C, N, O, P, S, Se
// Галогены (halogen): F, Cl, Br, I, At, Ts
// Благородные газы (noble): He, Ne, Ar, Kr, Xe, Rn, Og
// Металлоиды (metalloid): B, Si, Ge, As, Sb, Te, Po
// Щелочные (alkali): Li, Na, K, Rb, Cs, Fr
// Щёлочноземельные (alkaline): Be, Mg, Ca, Sr, Ba, Ra
// Переходные (transition): Sc..Zn, Y..Cd, Hf..Hg, Rf..Cn (+ La, Ac как начало)
// Постпереходные (post-trans): Al, Ga, In, Sn, Tl, Pb, Bi, Nh, Fl, Mc, Lv
// Лантаноиды: Ce..Lu
// Актиноиды: Th..Lr

const ELEMENTS = [
  { n:1,   s:'H',  name:'Водород',      mass:'1.008',   cat:'nonmetal',    period:1, group:1  },
  { n:2,   s:'He', name:'Гелий',        mass:'4.003',   cat:'noble',       period:1, group:18 },
  { n:3,   s:'Li', name:'Литий',        mass:'6.941',   cat:'alkali',      period:2, group:1  },
  { n:4,   s:'Be', name:'Бериллий',     mass:'9.012',   cat:'alkaline',    period:2, group:2  },
  { n:5,   s:'B',  name:'Бор',          mass:'10.811',  cat:'metalloid',   period:2, group:13 },
  { n:6,   s:'C',  name:'Углерод',      mass:'12.011',  cat:'nonmetal',    period:2, group:14 },
  { n:7,   s:'N',  name:'Азот',         mass:'14.007',  cat:'nonmetal',    period:2, group:15 },
  { n:8,   s:'O',  name:'Кислород',     mass:'15.999',  cat:'nonmetal',    period:2, group:16 },
  { n:9,   s:'F',  name:'Фтор',         mass:'18.998',  cat:'halogen',     period:2, group:17 },
  { n:10,  s:'Ne', name:'Неон',         mass:'20.180',  cat:'noble',       period:2, group:18 },
  { n:11,  s:'Na', name:'Натрий',       mass:'22.990',  cat:'alkali',      period:3, group:1  },
  { n:12,  s:'Mg', name:'Магний',       mass:'24.305',  cat:'alkaline',    period:3, group:2  },
  { n:13,  s:'Al', name:'Алюминий',     mass:'26.982',  cat:'post-trans',  period:3, group:13 },
  { n:14,  s:'Si', name:'Кремний',      mass:'28.086',  cat:'metalloid',   period:3, group:14 },
  { n:15,  s:'P',  name:'Фосфор',       mass:'30.974',  cat:'nonmetal',    period:3, group:15 },
  { n:16,  s:'S',  name:'Сера',         mass:'32.065',  cat:'nonmetal',    period:3, group:16 },
  { n:17,  s:'Cl', name:'Хлор',         mass:'35.453',  cat:'halogen',     period:3, group:17 },
  { n:18,  s:'Ar', name:'Аргон',        mass:'39.948',  cat:'noble',       period:3, group:18 },
  { n:19,  s:'K',  name:'Калий',        mass:'39.098',  cat:'alkali',      period:4, group:1  },
  { n:20,  s:'Ca', name:'Кальций',      mass:'40.078',  cat:'alkaline',    period:4, group:2  },
  { n:21,  s:'Sc', name:'Скандий',      mass:'44.956',  cat:'transition',  period:4, group:3  },
  { n:22,  s:'Ti', name:'Титан',        mass:'47.867',  cat:'transition',  period:4, group:4  },
  { n:23,  s:'V',  name:'Ванадий',      mass:'50.942',  cat:'transition',  period:4, group:5  },
  { n:24,  s:'Cr', name:'Хром',         mass:'51.996',  cat:'transition',  period:4, group:6  },
  { n:25,  s:'Mn', name:'Марганец',     mass:'54.938',  cat:'transition',  period:4, group:7  },
  { n:26,  s:'Fe', name:'Железо',       mass:'55.845',  cat:'transition',  period:4, group:8  },
  { n:27,  s:'Co', name:'Кобальт',      mass:'58.933',  cat:'transition',  period:4, group:9  },
  { n:28,  s:'Ni', name:'Никель',       mass:'58.693',  cat:'transition',  period:4, group:10 },
  { n:29,  s:'Cu', name:'Медь',         mass:'63.546',  cat:'transition',  period:4, group:11 },
  { n:30,  s:'Zn', name:'Цинк',         mass:'65.38',   cat:'transition',  period:4, group:12 },
  { n:31,  s:'Ga', name:'Галлий',       mass:'69.723',  cat:'post-trans',  period:4, group:13 },
  { n:32,  s:'Ge', name:'Германий',     mass:'72.630',  cat:'metalloid',   period:4, group:14 },
  { n:33,  s:'As', name:'Мышьяк',       mass:'74.922',  cat:'metalloid',   period:4, group:15 },
  { n:34,  s:'Se', name:'Селен',        mass:'78.971',  cat:'nonmetal',    period:4, group:16 },
  { n:35,  s:'Br', name:'Бром',         mass:'79.904',  cat:'halogen',     period:4, group:17 },
  { n:36,  s:'Kr', name:'Криптон',      mass:'83.798',  cat:'noble',       period:4, group:18 },
  { n:37,  s:'Rb', name:'Рубидий',      mass:'85.468',  cat:'alkali',      period:5, group:1  },
  { n:38,  s:'Sr', name:'Стронций',     mass:'87.62',   cat:'alkaline',    period:5, group:2  },
  { n:39,  s:'Y',  name:'Иттрий',       mass:'88.906',  cat:'transition',  period:5, group:3  },
  { n:40,  s:'Zr', name:'Цирконий',     mass:'91.224',  cat:'transition',  period:5, group:4  },
  { n:41,  s:'Nb', name:'Ниобий',       mass:'92.906',  cat:'transition',  period:5, group:5  },
  { n:42,  s:'Mo', name:'Молибден',     mass:'95.96',   cat:'transition',  period:5, group:6  },
  { n:43,  s:'Tc', name:'Технеций',     mass:'[98]',    cat:'transition',  period:5, group:7  },
  { n:44,  s:'Ru', name:'Рутений',      mass:'101.07',  cat:'transition',  period:5, group:8  },
  { n:45,  s:'Rh', name:'Родий',        mass:'102.906', cat:'transition',  period:5, group:9  },
  { n:46,  s:'Pd', name:'Палладий',     mass:'106.42',  cat:'transition',  period:5, group:10 },
  { n:47,  s:'Ag', name:'Серебро',      mass:'107.868', cat:'transition',  period:5, group:11 },
  { n:48,  s:'Cd', name:'Кадмий',       mass:'112.411', cat:'transition',  period:5, group:12 },
  { n:49,  s:'In', name:'Индий',        mass:'114.818', cat:'post-trans',  period:5, group:13 },
  { n:50,  s:'Sn', name:'Олово',        mass:'118.710', cat:'post-trans',  period:5, group:14 },
  { n:51,  s:'Sb', name:'Сурьма',       mass:'121.760', cat:'metalloid',   period:5, group:15 },
  { n:52,  s:'Te', name:'Теллур',       mass:'127.60',  cat:'metalloid',   period:5, group:16 },
  { n:53,  s:'I',  name:'Иод',          mass:'126.904', cat:'halogen',     period:5, group:17 },
  { n:54,  s:'Xe', name:'Ксенон',       mass:'131.293', cat:'noble',       period:5, group:18 },
  { n:55,  s:'Cs', name:'Цезий',        mass:'132.905', cat:'alkali',      period:6, group:1  },
  { n:56,  s:'Ba', name:'Барий',        mass:'137.327', cat:'alkaline',    period:6, group:2  },
  { n:57,  s:'La', name:'Лантан',       mass:'138.905', cat:'lanthanide',  period:6, group:3, lanthanide:true },
  { n:58,  s:'Ce', name:'Церий',        mass:'140.116', cat:'lanthanide',  period:8, group:4  },
  { n:59,  s:'Pr', name:'Празеодим',    mass:'140.908', cat:'lanthanide',  period:8, group:5  },
  { n:60,  s:'Nd', name:'Неодим',       mass:'144.242', cat:'lanthanide',  period:8, group:6  },
  { n:61,  s:'Pm', name:'Прометий',     mass:'[145]',   cat:'lanthanide',  period:8, group:7  },
  { n:62,  s:'Sm', name:'Самарий',      mass:'150.36',  cat:'lanthanide',  period:8, group:8  },
  { n:63,  s:'Eu', name:'Европий',      mass:'151.964', cat:'lanthanide',  period:8, group:9  },
  { n:64,  s:'Gd', name:'Гадолиний',    mass:'157.25',  cat:'lanthanide',  period:8, group:10 },
  { n:65,  s:'Tb', name:'Тербий',       mass:'158.925', cat:'lanthanide',  period:8, group:11 },
  { n:66,  s:'Dy', name:'Диспрозий',    mass:'162.500', cat:'lanthanide',  period:8, group:12 },
  { n:67,  s:'Ho', name:'Гольмий',      mass:'164.930', cat:'lanthanide',  period:8, group:13 },
  { n:68,  s:'Er', name:'Эрбий',        mass:'167.259', cat:'lanthanide',  period:8, group:14 },
  { n:69,  s:'Tm', name:'Тулий',        mass:'168.934', cat:'lanthanide',  period:8, group:15 },
  { n:70,  s:'Yb', name:'Иттербий',     mass:'173.054', cat:'lanthanide',  period:8, group:16 },
  { n:71,  s:'Lu', name:'Лютеций',      mass:'174.967', cat:'lanthanide',  period:8, group:17 },
  { n:72,  s:'Hf', name:'Гафний',       mass:'178.49',  cat:'transition',  period:6, group:4  },
  { n:73,  s:'Ta', name:'Тантал',       mass:'180.948', cat:'transition',  period:6, group:5  },
  { n:74,  s:'W',  name:'Вольфрам',     mass:'183.84',  cat:'transition',  period:6, group:6  },
  { n:75,  s:'Re', name:'Рений',        mass:'186.207', cat:'transition',  period:6, group:7  },
  { n:76,  s:'Os', name:'Осмий',        mass:'190.23',  cat:'transition',  period:6, group:8  },
  { n:77,  s:'Ir', name:'Иридий',       mass:'192.217', cat:'transition',  period:6, group:9  },
  { n:78,  s:'Pt', name:'Платина',      mass:'195.084', cat:'transition',  period:6, group:10 },
  { n:79,  s:'Au', name:'Золото',       mass:'196.967', cat:'transition',  period:6, group:11 },
  { n:80,  s:'Hg', name:'Ртуть',        mass:'200.592', cat:'transition',  period:6, group:12 },
  { n:81,  s:'Tl', name:'Таллий',       mass:'204.383', cat:'post-trans',  period:6, group:13 },
  { n:82,  s:'Pb', name:'Свинец',       mass:'207.2',   cat:'post-trans',  period:6, group:14 },
  { n:83,  s:'Bi', name:'Висмут',       mass:'208.980', cat:'post-trans',  period:6, group:15 },
  { n:84,  s:'Po', name:'Полоний',      mass:'[209]',   cat:'metalloid',   period:6, group:16 },
  { n:85,  s:'At', name:'Астат',        mass:'[210]',   cat:'halogen',     period:6, group:17 },
  { n:86,  s:'Rn', name:'Радон',        mass:'[222]',   cat:'noble',       period:6, group:18 },
  { n:87,  s:'Fr', name:'Франций',      mass:'[223]',   cat:'alkali',      period:7, group:1  },
  { n:88,  s:'Ra', name:'Радий',        mass:'[226]',   cat:'alkaline',    period:7, group:2  },
  { n:89,  s:'Ac', name:'Актиний',      mass:'[227]',   cat:'actinide',    period:7, group:3, actinide:true },
  { n:90,  s:'Th', name:'Торий',        mass:'232.038', cat:'actinide',    period:9, group:4  },
  { n:91,  s:'Pa', name:'Протактиний',  mass:'231.036', cat:'actinide',    period:9, group:5  },
  { n:92,  s:'U',  name:'Уран',         mass:'238.029', cat:'actinide',    period:9, group:6  },
  { n:93,  s:'Np', name:'Нептуний',     mass:'[237]',   cat:'actinide',    period:9, group:7  },
  { n:94,  s:'Pu', name:'Плутоний',     mass:'[244]',   cat:'actinide',    period:9, group:8  },
  { n:95,  s:'Am', name:'Америций',     mass:'[243]',   cat:'actinide',    period:9, group:9  },
  { n:96,  s:'Cm', name:'Кюрий',        mass:'[247]',   cat:'actinide',    period:9, group:10 },
  { n:97,  s:'Bk', name:'Берклий',      mass:'[247]',   cat:'actinide',    period:9, group:11 },
  { n:98,  s:'Cf', name:'Калифорний',   mass:'[251]',   cat:'actinide',    period:9, group:12 },
  { n:99,  s:'Es', name:'Эйнштейний',   mass:'[252]',   cat:'actinide',    period:9, group:13 },
  { n:100, s:'Fm', name:'Фермий',       mass:'[257]',   cat:'actinide',    period:9, group:14 },
  { n:101, s:'Md', name:'Менделевий',   mass:'[258]',   cat:'actinide',    period:9, group:15 },
  { n:102, s:'No', name:'Нобелий',      mass:'[259]',   cat:'actinide',    period:9, group:16 },
  { n:103, s:'Lr', name:'Лоуренсий',    mass:'[262]',   cat:'actinide',    period:9, group:17 },
  { n:104, s:'Rf', name:'Резерфордий',  mass:'[265]',   cat:'transition',  period:7, group:4  },
  { n:105, s:'Db', name:'Дубний',       mass:'[268]',   cat:'transition',  period:7, group:5  },
  { n:106, s:'Sg', name:'Сиборгий',     mass:'[271]',   cat:'transition',  period:7, group:6  },
  { n:107, s:'Bh', name:'Борий',        mass:'[270]',   cat:'transition',  period:7, group:7  },
  { n:108, s:'Hs', name:'Хассий',       mass:'[277]',   cat:'transition',  period:7, group:8  },
  { n:109, s:'Mt', name:'Мейтнерий',    mass:'[278]',   cat:'transition',  period:7, group:9  },
  { n:110, s:'Ds', name:'Дармштадтий',  mass:'[281]',   cat:'transition',  period:7, group:10 },
  { n:111, s:'Rg', name:'Рентгений',    mass:'[282]',   cat:'transition',  period:7, group:11 },
  { n:112, s:'Cn', name:'Коперниций',   mass:'[285]',   cat:'transition',  period:7, group:12 },
  { n:113, s:'Nh', name:'Нихоний',      mass:'[286]',   cat:'post-trans',  period:7, group:13 },
  { n:114, s:'Fl', name:'Флеровий',     mass:'[289]',   cat:'post-trans',  period:7, group:14 },
  { n:115, s:'Mc', name:'Московий',     mass:'[290]',   cat:'post-trans',  period:7, group:15 },
  { n:116, s:'Lv', name:'Ливерморий',   mass:'[293]',   cat:'post-trans',  period:7, group:16 },
  { n:117, s:'Ts', name:'Теннессин',    mass:'[294]',   cat:'halogen',     period:7, group:17 },
  { n:118, s:'Og', name:'Оганесон',     mass:'[294]',   cat:'noble',       period:7, group:18 },
];

const CAT_COLORS = {
  alkali:      { bg: 'bg-red-100',    border: 'border-red-300',    text: 'text-red-800',    dot: 'bg-red-400',    label: 'Щелочные металлы' },
  alkaline:    { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800', dot: 'bg-orange-400', label: 'Щёлочноземельные' },
  lanthanide:  { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-800', dot: 'bg-yellow-400', label: 'Лантаноиды' },
  actinide:    { bg: 'bg-lime-100',   border: 'border-lime-300',   text: 'text-lime-800',   dot: 'bg-lime-500',   label: 'Актиноиды' },
  transition:  { bg: 'bg-sky-100',    border: 'border-sky-300',    text: 'text-sky-800',    dot: 'bg-sky-400',    label: 'Переходные металлы' },
  'post-trans':{ bg: 'bg-teal-100',   border: 'border-teal-300',   text: 'text-teal-800',   dot: 'bg-teal-400',   label: 'Постпереходные металлы' },
  metalloid:   { bg: 'bg-green-100',  border: 'border-green-300',  text: 'text-green-800',  dot: 'bg-green-500',  label: 'Металлоиды' },
  nonmetal:    { bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-800', dot: 'bg-violet-400', label: 'Неметаллы' },
  halogen:     { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800', dot: 'bg-purple-400', label: 'Галогены' },
  noble:       { bg: 'bg-pink-100',   border: 'border-pink-300',   text: 'text-pink-800',   dot: 'bg-pink-400',   label: 'Благородные газы' },
};

// Группа "Металлы" = несколько категорий
const METALS_CATS = new Set(['alkali', 'alkaline', 'transition', 'post-trans', 'lanthanide', 'actinide']);

function buildGrid() {
  const grid = {};
  for (const el of ELEMENTS) {
    if (el.lanthanide && el.n !== 57) {
      grid[`8-${el.n - 57 + 3}`] = el;
    } else if (el.actinide && el.n !== 89) {
      grid[`9-${el.n - 89 + 3}`] = el;
    } else {
      grid[`${el.period}-${el.group}`] = el;
    }
  }
  return grid;
}
const GRID = buildGrid();

function ElementCell({ el, onClick, highlight, metalsMode }) {
  if (!el) return <div />;
  const c = CAT_COLORS[el.cat] || CAT_COLORS.nonmetal;
  let isHighlighted;
  if (metalsMode) {
    isHighlighted = METALS_CATS.has(el.cat);
  } else {
    isHighlighted = !highlight || highlight === el.cat;
  }
  return (
    <button
      onClick={() => onClick(el)}
      title={el.name}
      className={`
        relative flex flex-col items-center justify-center rounded-md border cursor-pointer
        transition-all duration-150 select-none
        ${c.bg} ${c.border} ${c.text}
        ${isHighlighted ? 'opacity-100 shadow-sm hover:scale-110 hover:z-10 hover:shadow-md' : 'opacity-15'}
        w-full aspect-square text-center p-0.5
      `}
      style={{ minWidth: 0 }}
    >
      <span className="text-[7px] leading-none opacity-60">{el.n}</span>
      <span className="font-heading font-bold text-[10px] sm:text-xs leading-none">{el.s}</span>
    </button>
  );
}

export default function PeriodicTableSection() {
  const [selected, setSelected] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [metalsMode, setMetalsMode] = useState(false);

  const periods = [1,2,3,4,5,6,7];
  const groups  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

  const toggleFilter = (cat) => {
    setMetalsMode(false);
    setHighlight(h => h === cat ? null : cat);
  };

  const toggleMetals = () => {
    setMetalsMode(m => !m);
    setHighlight(null);
  };

  return (
    <section className="py-20 lg:py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-body font-medium mb-4">
            <Atom className="w-4 h-4" />
            Периодическая таблица Менделеева
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Все 118 элементов
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            Нажми на любой элемент, чтобы узнать подробности и электронную конфигурацию.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {/* Metals button */}
          <button
            onClick={toggleMetals}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-body font-semibold border-2 transition-all
              ${metalsMode
                ? 'bg-slate-700 border-slate-700 text-white shadow-md'
                : 'bg-background border-slate-400 text-slate-700 hover:border-slate-600'}`}
          >
            <Layers className="w-3 h-3" />
            Металлы
          </button>

          {/* Per-category buttons */}
          {Object.entries(CAT_COLORS).map(([cat, c]) => (
            <button
              key={cat}
              onClick={() => toggleFilter(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium border transition-all
                ${highlight === cat ? `${c.bg} ${c.border} ${c.text} shadow-sm` : 'bg-background border-border text-muted-foreground hover:border-primary/30'}`}
            >
              <span className={`w-2 h-2 rounded-full ${c.dot}`} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Metals legend when active */}
        <AnimatePresence>
          {metalsMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex flex-wrap justify-center gap-2 pb-2">
                {['transition','post-trans','alkali','alkaline','lanthanide','actinide'].map(cat => {
                  const c = CAT_COLORS[cat];
                  return (
                    <div key={cat} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium border ${c.bg} ${c.border} ${c.text}`}>
                      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                      {c.label}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main table */}
        <div className="overflow-x-auto pb-2">
          <div style={{ minWidth: 560 }}>
            <div className="grid gap-0.5 mb-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
              {groups.map(g => (
                <div key={g} className="text-center text-[8px] text-muted-foreground font-body font-medium">{g}</div>
              ))}
            </div>

            {periods.map(period => (
              <div key={period} className="grid gap-0.5 mb-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
                {groups.map(group => {
                  const el = GRID[`${period}-${group}`];
                  if (!el && period === 6 && group === 3) {
                    return <div key={group} className="flex items-center justify-center rounded-md border border-yellow-200 bg-yellow-50 aspect-square text-[6px] text-yellow-600 font-body font-medium">57-71</div>;
                  }
                  if (!el && period === 7 && group === 3) {
                    return <div key={group} className="flex items-center justify-center rounded-md border border-lime-200 bg-lime-50 aspect-square text-[6px] text-lime-600 font-body font-medium">89-103</div>;
                  }
                  return <ElementCell key={group} el={el} onClick={setSelected} highlight={highlight} metalsMode={metalsMode} />;
                })}
              </div>
            ))}

            <div className="h-3" />

            {/* Lanthanides */}
            <div className="grid gap-0.5 mb-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
              <div className="col-span-2 flex items-center justify-end pr-1">
                <span className="text-[7px] text-muted-foreground font-body whitespace-nowrap">Лантаноиды</span>
              </div>
              {[57,58,59,60,61,62,63,64,65,66,67,68,69,70,71].map(n => {
                const el = ELEMENTS.find(e => e.n === n);
                return <ElementCell key={n} el={el} onClick={setSelected} highlight={highlight} metalsMode={metalsMode} />;
              })}
              <div />
            </div>

            {/* Actinides */}
            <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
              <div className="col-span-2 flex items-center justify-end pr-1">
                <span className="text-[7px] text-muted-foreground font-body whitespace-nowrap">Актиноиды</span>
              </div>
              {[89,90,91,92,93,94,95,96,97,98,99,100,101,102,103].map(n => {
                const el = ELEMENTS.find(e => e.n === n);
                return <ElementCell key={n} el={el} onClick={setSelected} highlight={highlight} metalsMode={metalsMode} />;
              })}
              <div />
            </div>
          </div>
        </div>

        {/* Element detail modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
                className={`relative bg-card rounded-3xl shadow-2xl border p-6 max-w-md w-full overflow-y-auto max-h-[90vh] ${CAT_COLORS[selected.cat]?.border || 'border-border'}`}
              >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 flex-shrink-0 ${CAT_COLORS[selected.cat]?.bg} ${CAT_COLORS[selected.cat]?.border}`}>
                    <span className={`text-xs font-body opacity-60 ${CAT_COLORS[selected.cat]?.text}`}>{selected.n}</span>
                    <span className={`font-heading font-bold text-3xl leading-none ${CAT_COLORS[selected.cat]?.text}`}>{selected.s}</span>
                    <span className={`text-[9px] font-body opacity-70 ${CAT_COLORS[selected.cat]?.text}`}>{selected.mass}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground">{selected.name}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-body font-medium ${CAT_COLORS[selected.cat]?.bg} ${CAT_COLORS[selected.cat]?.text}`}>
                      {CAT_COLORS[selected.cat]?.label}
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {[
                        { label: 'Атомный №', value: selected.n },
                        { label: 'Период', value: selected.period <= 7 ? selected.period : (selected.cat === 'lanthanide' ? 6 : 7) },
                        { label: 'Группа', value: selected.group },
                        { label: 'Масса', value: selected.mass },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-muted/50 rounded-lg px-2 py-1.5">
                          <div className="font-body text-[10px] text-muted-foreground">{label}</div>
                          <div className="font-heading font-bold text-foreground text-base leading-none">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <OrbitalDiagram n={selected.n} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}