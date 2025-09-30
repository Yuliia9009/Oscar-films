# 🏆 Oscar Films — React + TMDB

Каталог фильмов: популярные, поиск, детальная страница, актёры и фильмография, «избранное» (сохраняется в `localStorage`), ленивая подгрузка.


## ✨ Возможности
- 🔎 Поиск по названию (TMDB Search API)
- 🎬 Популярные фильмы на главной (TMDB Popular)
- 🧾 Детальная страница: постер, описание, рейтинг
- 👤 Персоны: страница актёра + фильмография
- ⭐ Избранное (добавить/удалить, хранится в `localStorage`)
- ⏳ Ленивая подгрузка — «Загрузить ещё»

## 🧰 Стек
**React (CRA)** · **React Router** · **Axios** · **TMDB API**


---


## 🎥 Видео-обзор

Смотри обзор проекта на YouTube:  
➡️ [Oscar Films Demo](https://youtu.be/eLsnTCbi5_U)


---


## 🚀 Быстрый старт

### 1) Требования
- Node **18+** (рекомендовано LTS 20)
- Аккаунт TMDB и **API Key (v3 auth)**

### 2) Установка
```bash
git clone https://github.com/Yuliia9009/Oscar-films.git
cd Oscar-films
npm i
```

### 3) Переменные окружения
Создайте файл **`.env`** в корне проекта:
```bash
REACT_APP_THEMOVIEDB_KEY=<ВАШ_TMDB_API_KEY>
```

**Важно:** добавьте `.env` в `.gitignore`.

### 4) Запуск dev-сервера
```bash
npm start
```
Откроется `http://localhost:3000`.

### 5) Продакшн-сборка
```bash
npm run build
```

---


## 🔌 Используемые эндпоинты TMDB

- **Популярные:** `GET /movie/popular`
- **Поиск:** `GET /search/movie`
- **Детали фильма:** `GET /movie/{id}?append_to_response=videos,images`
- **Актёры/съёмочная группа:** `GET /movie/{id}/credits`
- **Персона:** `GET /person/{id}`, `GET /person/{id}/movie_credits`

---


## 🧪 Скрипты npm
```bash
npm start       # запуск dev-сервера
npm run build   # сборка на прод
```

---

## 🙏 Благодарности
- [TMDB](https://www.themoviedb.org/) за API и материалы.

## 📄 Лицензия
MIT
