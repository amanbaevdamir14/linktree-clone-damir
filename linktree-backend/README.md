# Linktree Clone — Backend

## Требования
- Java 17+
- Maven
- PostgreSQL

## PostgreSQL
Создайте базу:
```sql
CREATE DATABASE linktree;
```

Логин/пароль по умолчанию в `application.properties`:
`postgres / postgres`

При необходимости измените их.

## Запуск
```bash
mvn spring-boot:run
```

Проверка API:
```bash
curl http://localhost:8080/api/links
```

API должен вернуть JSON-массив ссылок, отсортированный по `orderIndex`.
