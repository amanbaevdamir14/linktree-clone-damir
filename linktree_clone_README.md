# Linktree Clone

Веб-приложение в стиле Linktree: персональная страница с аватаркой, именем и списком ссылок.

## 1. Требования

Установлены и проверены:

- JDK 17 или выше
- Maven
- Node.js
- npm
- PostgreSQL 18
- Visual Studio Code

Проверка:

```powershell
java -version
mvn -version
node -v
npm -v
```

Проверка PostgreSQL:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" --version
```

> В Windows PowerShell, если команда `npm` заблокирована политикой выполнения скриптов, используйте `npm.cmd`.

## 2. Открытие проекта

Откройте в VS Code корневую папку:

```text
linktree-clone
```

Структура:

```text
linktree-clone/
├── linktree-backend/
├── linktree-frontend/
└── README.md
```

## 3. Создание базы PostgreSQL

Подключитесь:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres
```

Введите пароль пользователя `postgres`.

Создайте базу:

```sql
CREATE DATABASE linktree;
```

Выйдите:

```text
\q
```

## 4. Настройка Backend

Откройте:

```text
linktree-backend/src/main/resources/application.properties
```

Укажите данные своей PostgreSQL:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/linktree
spring.datasource.username=postgres
spring.datasource.password=ВАШ_ПАРОЛЬ

spring.jpa.hibernate.ddl-auto=update
spring.jpa.defer-datasource-initialization=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

server.port=8080
```

> Не публикуйте настоящий пароль PostgreSQL в GitHub или других публичных местах.

## 5. Запуск Backend

В первом терминале VS Code:

```powershell
cd .\linktree-backend
mvn spring-boot:run
```

При успешном запуске:

```text
Started LinktreeApplication
Tomcat started on port 8080
```

Не закрывайте этот терминал.

## 6. Проверка базы и API

Откройте второй терминал.

Проверить таблицы:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d linktree -c "\dt"
```

Должна быть таблица:

```text
links
```

Проверить записи:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d linktree -c "SELECT id, title, url, order_index FROM links ORDER BY order_index;"
```

Проверить API в браузере:

```text
http://localhost:8080/api/links
```

или в PowerShell:

```powershell
Invoke-RestMethod http://localhost:8080/api/links
```

API должен вернуть JSON-массив ссылок.

## 7. Запуск Frontend

Откройте третий терминал:

```powershell
cd .\linktree-frontend
```

Установите зависимости:

```powershell
npm.cmd install
```

Запустите Vite:

```powershell
npm.cmd run dev
```

Появится:

```text
Local: http://localhost:5173/
```

Не закрывайте этот терминал.

## 8. Открытие сайта

В браузере:

```text
http://localhost:5173/
```

Должны отображаться аватарка, имя, никнейм и ссылки из API.

## 9. Проверка темы

Нажмите кнопку с луной/солнцем.

Тема должна меняться без перезагрузки.

После:

```text
Ctrl + R
```

выбранная тема должна сохраниться.

## 10. Проверка ссылок

Нажатие на кнопку должно открывать соответствующий адрес в новой вкладке.

Адреса ссылок frontend получает через API.

## 11. Проверка связи frontend с базой

Можно изменить название записи непосредственно в PostgreSQL:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d linktree -c "UPDATE links SET title='My GitHub' WHERE id=1;"
```

Обновите:

```text
http://localhost:5173/
```

Название первой ссылки должно измениться на `My GitHub`.

Это подтверждает, что ссылки приходят из базы через backend, а не захардкожены во frontend.

## 12. Если frontend показывает ошибку загрузки

Проверьте:

```text
http://localhost:8080/api/links
```

Если API не открывается, запустите backend:

```powershell
cd .\linktree-backend
mvn spring-boot:run
```

## 13. Если Maven не запускается

Убедитесь, что вы находитесь в:

```text
...\linktree-clone\linktree-backend
```

Проверка:

```powershell
Get-Location
```

Затем:

```powershell
mvn spring-boot:run
```

## 14. Если PostgreSQL выдаёт ошибку пароля

Ошибка:

```text
password authentication failed for user "postgres"
```

означает, что пароль в `application.properties` не совпадает с паролем PostgreSQL.

Проверьте подключение:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -h localhost -p 5432 -U postgres -d linktree
```

Если появляется:

```text
linktree=#
```

подключение успешно.

## 15. Если `npm` не запускается в PowerShell

Используйте:

```powershell
npm.cmd install
npm.cmd run dev
```

## 16. Адреса проекта

| Компонент | Адрес |
|---|---|
| Frontend | http://localhost:5173/ |
| Backend | http://localhost:8080/ |
| REST API | http://localhost:8080/api/links |
| PostgreSQL | localhost:5432 |
| Database | `linktree` |

## 17. Быстрый запуск после первой настройки

### Терминал 1

```powershell
cd .\linktree-backend
mvn spring-boot:run
```

### Терминал 2

```powershell
cd .\linktree-frontend
npm.cmd run dev
```

Открыть:

```text
http://localhost:5173/
```

## 18. Остановка

В соответствующем терминале:

```text
Ctrl + C
```

## Итог

Для локальной работы одновременно должны быть доступны:

```text
PostgreSQL  → localhost:5432
Backend     → localhost:8080
Frontend    → localhost:5173
```

Главная страница:

```text
http://localhost:5173/
```

REST API:

```text
http://localhost:8080/api/links
```
