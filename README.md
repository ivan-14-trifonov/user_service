# Сервис управления пользователями

Комплексный сервис управления пользователями, созданный с использованием Express.js, TypeScript и PostgreSQL с TypeORM.

## Возможности

- Регистрация пользователей с проверкой электронной почты
- Безопасная аутентификация с токенами JWT
- Контроль доступа на основе ролей (администратор/пользователь)
- Управление профилем пользователя
- Функциональность блокировки/разблокировки пользователей
- Валидация ввода и меры безопасности

## Технологический стек

- **Бэкенд фреймворк**: Express.js
- **Язык программирования**: TypeScript
- **База данных**: PostgreSQL
- **ORM**: TypeORM
- **Аутентификация**: JSON Web Токены (JWT)
- **Хеширование паролей**: bcrypt
- **Валидация**: Joi

## Эндпоинты

### Аутентификация

- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход с электронной почтой и паролем

### Управление пользователями (требует аутентификации)

- `GET /api/users/:id` - Получить пользователя по ID (доступно администратору или самому пользователю)
- `GET /api/users` - Получить всех пользователей (только для администраторов)
- `PUT /api/users/:id/block` - Заблокировать пользователя (администратор или сам пользователь)
- `PUT /api/users/:id/unblock` - Разблокировать пользователя (администратор или сам пользователь)

### Документация API (Swagger)

- `GET /api-docs` - Интерактивный интерфейс документации API Swagger

## Инструкции по установке

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/ivan-14-trifonov/user_service.git
   ```
2. Установите зависимости:
   ```bash
   cd user_service
   npm install
   ```
3. Создайте файл `.env` и установите следующие переменные окружения:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=user_management_db
   JWT_SECRET=ваш_секретный_ключ_jwt
   PORT=3000
   ```
4. Запустите приложение:
   ```bash
   npm run dev
   ```

## Переменные окружения

- `DB_HOST`: Хост базы данных (по умолчанию: localhost)
- `DB_PORT`: Порт базы данных (по умолчанию: 5432)
- `DB_USERNAME`: Имя пользователя базы данных (по умолчанию: postgres)
- `DB_PASSWORD`: Пароль базы данных (по умолчанию: postgres)
- `DB_NAME`: Имя базы данных (по умолчанию: user_management_db)
- `JWT_SECRET`: Секретный ключ для JWT токенов (по умолчанию: default_secret_key)
- `PORT`: Порт сервера (по умолчанию: 3000)

### Генерация секретного ключа JWT

Для генерации надежного секретного ключа JWT можно использовать несколько методов:

#### Метод 1: Использование Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Метод 2: Использование OpenSSL
```bash
openssl rand -hex 64
```

#### Метод 3: Онлайн-генераторы
Вы можете использовать надежные онлайн-генераторы случайных ключей, но убедитесь, что они безопасны и не сохраняют ваши сгенерированные ключи.

После генерации ключа добавьте его в файл `.env`:
```env
JWT_SECRET=ваш_сгенерированный_секретный_ключ_здесь
```

**Важно**: Никогда не коммитьте реальный JWT_SECRET в репозиторий. Файл `.env` уже игнорируется благодаря файлу `.gitignore`, который мы создали.

## Примеры использования

### Регистрация нового пользователя:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Иван Иванов",
    "birthDate": "1990-01-01",
    "email": "ivan@example.com",
    "password": "password123"
  }'
```

### Вход в систему:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ivan@example.com",
    "password": "password123"
  }'
```

### Получить пользователя по ID (требует аутентификации):
```bash
curl -X GET http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer <jwt_токен>"
```

## Меры безопасности

- Пароли хешируются с использованием bcrypt
- JWT токены для аутентификации
- Валидация ввода с использованием Joi
- Защита от распространенных уязвимостей с помощью helmet
- CORS включен для веб-приложений
- Контроль доступа на основе ролей

## Структура проекта

```
src/
├── controllers/          # Логика обработки запросов
├── middleware/           # Middleware для аутентификации и валидации
├── models/               # Сущности базы данных
├── routes/               # Определения маршрутов API
├── services/             # Бизнес-логика
├── utils/                # Вспомогательные функции
├── config/               # Конфигурационные файлы
└── app.ts                # Главный файл приложения
```

## Документация API (Swagger)

API документация доступна через Swagger UI по адресу `http://localhost:3000/api-docs` после запуска приложения.

Для добавления новой документации к API эндпоинтам используйте аннотации JSDoc в формате OpenAPI в контроллерах.

Пример аннотации:
```javascript
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user account in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
```

## Запуск в продакшене

Для сборки и запуска в продакшене:

```bash
npm run build
npm start
```