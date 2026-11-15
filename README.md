# SHOPPE

Демо-витрина ювелирного магазина: каталог, корзина, checkout, блог, личный кабинет. Данные в моках — можно крутить UI и SSR без бэкенда.

**Демо:** [sh0ppe.netlify.app](https://sh0ppe.netlify.app/)

## Стек

Nuxt 4 · Vue 3 · TypeScript · Pinia · SCSS · Vitest

## Быстрый старт

```bash
npm ci
npm run dev
```

Откроется [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда                         | Зачем                                                           |
| ------------------------------- | --------------------------------------------------------------- |
| `npm run dev`                   | Разработка                                                      |
| `npm run build`                 | Production (перед билдом — WebP для картинок в `public/images`) |
| `npm run preview`               | Локальный просмотр сборки                                       |
| `npm run typecheck`             | Проверка типов                                                  |
| `npm run lint` / `format:check` | ESLint / Prettier                                               |
| `npm run test`                  | Юнит-тесты                                                      |

## Деплой (Netlify)

Репозиторий подключается в Netlify как есть: `netlify.toml` задаёт `npm run build`, publish — `dist`, preset Nitro — `netlify` (SSR).

## Структура

- `app/` — страницы, компоненты, stores, данные
- `public/images/` — статика (перед билдом JPEG/PNG конвертируются в WebP)
- `tests/` — Vitest

---

Пет-проект для вёрстки и Nuxt SSR, не продакшен-магазин.
