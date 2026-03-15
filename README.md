# 📝 ToDo Приложение

Полноценное веб-приложение для управления задачами, построенное на стеке MERN.

## 🌐 Демо
[https://todoapp-five-kohl.vercel.app/](https://todoapp-five-kohl.vercel.app/)

> ⚠️ Backend развёрнут на бесплатном хостинге, поэтому первый запрос может занять несколько секунд. 

## ✨ Функциональность
- Регистрация и авторизация пользователей
- Создание, редактирование и удаление задач
- Задачи сохраняются в базе данных для каждого пользователя отдельно
- Адаптивный дизайн для мобильных устройств
- Уведомления об успешных и неуспешных действиях

## 🛠 Технологии

**Frontend:**
- React.js
- Redux
- Bootstrap
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs

**Деплой:**
- Vercel (фронтенд и бэкенд)

## 🚀 Локальный запуск

### Backend
```bash
cd backend
npm install
node app.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## ⚙️ Переменные окружения

Создайте файл `.env` в папке `backend`:
```
MONGO_URI=ваша_строка_подключения_mongodb
```

## 📁 Структура проекта
```
todoapp/
├── backend/
│   ├── conn/
│   ├── models/
│   ├── routes/
│   └── app.js
└── frontend/
    └── src/
        ├── components/
        └── store/
```


