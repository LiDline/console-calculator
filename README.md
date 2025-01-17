# Console calculator

Test task for Byndyusoft. Вакансия: JavaScript-разработчик / backend на Node.js (IT компания)

## Описание

Проект реализован с использованием архитектуры T3 - monorepo. Фронтенд выполнен на Next.js, а бэкенд на tRPC. Лексер, парсер и визитор были реализованы с помощью библиотеки [Chevrotain](https://chevrotain.io/docs/). В качестве примеров были использованы следующие ресурсы:

- [Playground](https://chevrotain.io/playground/) Chevrotain;
- [Статья](https://leanylabs.com/blog/js-formula-engine/), описывающая работу библиотеки Chevrotain;
- [Репозиторий](https://github.com/codebox/top-down-parser) с реализацией top-down parser.

## Запуск

### prod

```bash
docker compose up --build
```

### dev

```bash
npm install -g pnpm
pnpm i —frozen-lockfile
pnpm dev
```

#### http://localhost:3000/

## tests

```bash
pnpm e2e
```

## Дерево проекта

```text
|─apps
|   └─ Frontend компоненты проекта
|
├─server
|   ├─ api
|   |   └─ роутер, создание провайдера (проверка строки), методы калькулятора, грамматика
|   └─ validator
|       └─ Zod-схемы, интерфейсы
|
└─ jest.config.js
    └─ Настройки тестовой среды
```

## Расширение грамматики

Чтобы расширить грамматику допустимых символов, нужно сделать следующее:

- Добавить новые токены: ./src/server/api/CONST.ts

- Обновить лексер: ./src/server/api/routers/calculator/func/createTokens.ts

- Обновить парсер: ./src/server/api/routers/calculator/func/customParser.ts

- Обновить визитор: ./src/server/api/routers/calculator/func/customVisitor.ts
