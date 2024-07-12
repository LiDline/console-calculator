# Console calculator

Test task for Byndyusoft. Вакансия: JavaScript-разработчик / backend на Node.js (IT компания)

## Запуск

### dev

```bash
npm install -g pnpm
pnpm I —frozen-lockfile
pnpm dev
```

### prod

```bash

```

### tests

```bash
pnpm e2e
pnpm unit
```

## Описание

Проект построен на T3 - monorepo. Front - Next.js, Backend - tRPC. Реализация lexer, parser и visitor выполнена через библиотеку [Chevrotain](https://chevrotain.io/docs/). Для примера использованы следующие ресурсы:

- [Playground](https://chevrotain.io/playground/) Chevrotain;
- [Статья](https://leanylabs.com/blog/js-formula-engine/), описывающая работу библиотеки Chevrotain;
- [Репозиторий](https://github.com/codebox/top-down-parser) с реализацией top-down parser.

## Дерево проекта

```text
|─apps
|   └─ Frontend компоненты проекта
|
├─server
|   ├─ api
|   |   └─ роутер, создание провайдера (проверка строки), методы калькулятора
|   └─ validator
|       └─ Zod-схемы, интерфейсы
|
└─ jest.config.js
    └─ Настройки тестовой среды
```
