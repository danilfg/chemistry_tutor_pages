# Chemistry Tutor — UI Demo

Статическая демонстрация интерфейса образовательного проекта и бесплатных тренажёров по химии.

- [GitHub Pages](https://danilfg.github.io/chemistry_tutor_pages/)
- [Основной сайт](https://arsenikum.ru/)

## Возможности

- Режимы ученика и родителя.
- Интерактивная химическая лаборатория.
- Ряд активности металлов.
- Периодическая таблица.
- Калькулятор молярной массы.
- Разделение смесей.
- Примеры экранов лендинга.

Демонстрация не принимает заявки или платежи и не подключается к production API. Тарифы приведены только как примеры оформления. Актуальные данные представлены на основном сайте.

## Локальная разработка

```sh
npm install
npm run dev
npm run build
npm run preview
```

React 18, Vite, Tailwind CSS, Framer Motion. Django, PostgreSQL, Base44 и production-конфигурация отсутствуют.

## GitHub Pages

В Settings → Pages выберите Source → GitHub Actions. Workflow Pages собирает и публикует папку dist при изменении ветки main. При первоначальной настройке запустите workflow вручную.
