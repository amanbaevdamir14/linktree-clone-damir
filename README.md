# Linktree Clone — Assignment 3

Проект на React + TypeScript, Java Spring Boot и PostgreSQL. Реализованы просмотр, создание, редактирование и удаление ссылок.

## Требования
- Java 17 или новее
- Maven
- Node.js и npm
- PostgreSQL

## 1. Настройка PostgreSQL
Создайте базу данных `linktree` в PostgreSQL. Убедитесь, что пользователь имеет доступ к ней. Пароль не хранится в проекте: задайте переменную окружения `DB_PASSWORD`. При необходимости задайте `DB_USERNAME` и `DB_URL`.

В PowerShell, перед запуском backend, например:
```powershell
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="ВАШ_ПАРОЛЬ_POSTGRES"
$env:DB_URL="jdbc:postgresql://localhost:5432/linktree"
```

## 2. Запуск backend
Откройте терминал в папке `linktree-clone` и выполните:
```powershell
cd linktree-backend
mvn spring-boot:run
```
Backend доступен на `http://localhost:8080`.

## 3. Запуск frontend
Откройте второй терминал в корне `linktree-clone`:
```powershell
cd linktree-frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`. Адрес API задаётся в `linktree-frontend/.env` через `VITE_API_URL`. После изменения `.env` перезапустите Vite.

## Страницы
- Публичная: `http://localhost:5173/`
- Управление ссылками: `http://localhost:5173/admin`

## API
- `GET /api/links` — список ссылок
- `POST /api/links` — создание (JSON: `title`, `url`), ответ 201
- `PUT /api/links/{id}` — редактирование
- `DELETE /api/links/{id}` — удаление, ответ 204

Название обязательно и не длиннее 50 символов. URL должен начинаться с `http://` или `https://` и не длиннее 2048 символов. При ошибках валидации сервер отвечает 400; если ссылка не найдена — 404.

## Примечание
Страница `/admin` не защищена паролем — это соответствует учебному заданию. Не публикуйте её без дополнительной защиты. Не добавляйте реальные пароли в Git.
