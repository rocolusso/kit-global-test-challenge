# Blog App

> 🧠 Односторінковий блог, створений за допомогою Next.js 15 (App Router), Redux, TypeScript, Tailwind і валідації ZOD.

---
## 🌍 Language | Мова | Язык

- [🇬🇧 English ](./../../../README.MD)
- [🇺🇦 Українська](./README.MD)
- [русский](./../ru/README.MD)

---

### 🧾 Опис
Односторінковий блог із використанням Redux, TypeScript, SSR 13 та валідації ZOD.

### ⚙️ Основа застосунку
Побудований на стандартному додатку Next.js (режим App Router, `/src`, ESLint, Tailwind)  
**Версія Next.js**: `15.2.4`

### 🛠 Особливості
- ESLint конфіг: **Airbnb стиль**
- `.eslintrc` включає:
    - TypeScript парсер
    - Airbnb базу + hooks
    - Кастомні правила:
        - дозволено `console.log`
        - вимкнено `prefer-default-export`
        - підтримка `.tsx`


- ✅ Next.js 15 with App Router
- ✅ Redux
- ✅ TypeScript + ESLint (Airbnb style)
- ✅ ZOD Validation
- ✅ Tailwind CSS
- ✅ Firebase integration
- ✅ Dark/Light Theme support


## 📸 Знімки екрана

> Ви можете переглянути коміти зі знімками інтерфейсу нижче:


![Home Screenshot](./../../screenshots/init.png)
## [initial commit](https://github.com/rocolusso/kit-global-test-challenge/commit/d95b228debda8e20caac5d809f16e98869abcecf)

## [change component render method to ssr (page with posts)](https://github.com/rocolusso/kit-global-test-challenge/commit/d95b228debda8e20caac5d809f16e98869abcecf)

## [changed component render method to ssr (post page) / added PostControls component](https://github.com/rocolusso/kit-global-test-challenge/commit/d95b228debda8e20caac5d809f16e98869abcecf)

## [fixed issues with styles / removed inline styles and replace on Tailwind](https://github.com/rocolusso/kit-global-test-challenge/commit/f822e3bff86c74d4cb5b5e660304ee51015f1d64)

## [updated NavButton component](https://github.com/rocolusso/kit-global-test-challenge/commit/c2717dffac1d80360d3fb4ca47e03f5610f37a20)

## [rename btnComponent for easier understandig the logic of component functionality](https://github.com/rocolusso/kit-global-test-challenge/commit/ff13eb906b65e1fcd5316899a2c1d8fd3913910d)

## [added functionality for adding comment of post](https://github.com/rocolusso/kit-global-test-challenge/commit/2a4d2d31d1af725d9cd51cd535d02fa2418c6366)

## [added functionality for editing data of post](https://github.com/rocolusso/kit-global-test-challenge/commit/93d2ddab54370e5dca9859f899a7dc0dcb8e2229)


## [updated functionality for editing post/// added funcion for deleting post from database](https://github.com/rocolusso/kit-global-test-challenge/commit/e97256757a756f309552adef8eaf75bb65e64f45)

## [added state manager redux for switching app theme in dark/light mode](https://github.com/rocolusso/kit-global-test-challenge/commit/446f48818760aa48c4403c4586c6fe64b9e88062)



## 🛠 Режими стилізації

> Проєкт використовує естетику дизайну Сильного мінімалізму, натхненну стилем GitHub Trending. Інтерфейс чистий, сучасний і спроєктований для простоти.


---

## 🚀 Початок роботи

```zsh
# 1. Встановіть залежності
npm install
# або
yarn

# 2. Запустіть у режимі розробки
npm run dev
# або
yarn dev

# 3. Збірка для продакшну
npm run build
# або
yarn build

# 4. Запуск продакшн-сервера
npm run start
# або
yarn start
