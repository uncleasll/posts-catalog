# 📚 Posts Catalog

A full-stack web application for browsing and publishing posts — built with React + TypeScript on the frontend and FastAPI + SQLite/PostgreSQL on the backend, with Firebase authentication.

---

## 🖥️ Live Demo

> **Frontend:** [https://posts-catalog.vercel.app](https://posts-catalog.vercel.app) *(replace with your deployed URL)*
> **Backend API:** [https://posts-catalog-api.onrender.com](https://posts-catalog-api.onrender.com) *(replace with your deployed URL)*
> **API Docs:** `{BACKEND_URL}/docs`

---

## ✨ Features

- **All Posts tab** — Browse all posts with search by title and filter by category
- **My Posts tab** — View, manage and delete your own posts
- **Create Post** — Form with title, description, category (preset + custom), with validation
- **Firebase Auth** — Email/password sign-in and sign-up
- **Pagination** — 9 posts per page across all views
- **Responsive design** — Works on mobile, tablet and desktop
- **TypeScript** throughout the frontend
- **React Query** for server state, caching and invalidation
- **Docker** — Fully containerised with `docker-compose`

---

## 🏗️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 18, TypeScript, Vite              |
| Styling    | Tailwind CSS                            |
| State      | TanStack React Query v5                 |
| Forms      | React Hook Form                         |
| Auth       | Firebase (email/password)               |
| HTTP       | Axios                                   |
| Backend    | Python 3.12, FastAPI                    |
| ORM        | SQLAlchemy 2                            |
| Database   | SQLite (default) / PostgreSQL (plus)    |
| Container  | Docker, docker-compose                  |
| Deploy     | Render (backend), Vercel (frontend)     |

---

## 📁 Project Structure

```
posts-catalog/
├── backend/
│   ├── main.py          # FastAPI app, routes
│   ├── crud.py          # DB operations
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── database.py      # DB connection
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/  # PostCard, Header, Modals, Pagination…
│   │   ├── pages/       # AllPostsPage, MyPostsPage
│   │   ├── hooks/       # usePosts, useDebounce
│   │   ├── services/    # api.ts, firebase.ts
│   │   ├── context/     # AuthContext
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # categories helper
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env.example
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

| Variable       | Description                        | Default                  |
|----------------|------------------------------------|--------------------------|
| `DATABASE_URL` | SQLAlchemy DB connection string    | `sqlite:///./posts.db`   |

**SQLite (default):**
```
DATABASE_URL=sqlite:///./posts.db
```

**PostgreSQL (optional):**
```
DATABASE_URL=postgresql://user:password@host:5432/posts_catalog
```

---

### Frontend — `frontend/.env`

| Variable                          | Description                     |
|-----------------------------------|---------------------------------|
| `VITE_API_URL`                    | Backend base URL                |
| `VITE_FIREBASE_API_KEY`           | Firebase API key                |
| `VITE_FIREBASE_AUTH_DOMAIN`       | Firebase auth domain            |
| `VITE_FIREBASE_PROJECT_ID`        | Firebase project ID             |
| `VITE_FIREBASE_STORAGE_BUCKET`    | Firebase storage bucket         |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID  |
| `VITE_FIREBASE_APP_ID`            | Firebase app ID                 |

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Create a project**
2. Navigate to **Authentication** → **Sign-in method** → Enable **Email/Password**
3. Go to **Project settings** → **Your apps** → **Add app** → choose Web (`</>`)
4. Copy the config values into your `frontend/.env`

---

## 🚀 Local Development

### Prerequisites
- Node.js 20+
- Python 3.12+
- (Optional) Docker & docker-compose

---

### Option A — Docker (recommended)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/posts-catalog.git
cd posts-catalog

# 2. Copy and fill in env vars
cp .env.example .env
# Edit .env with your Firebase credentials

# 3. Start everything
docker-compose up --build

# Frontend → http://localhost:3000
# Backend  → http://localhost:8000
# API docs → http://localhost:8000/docs
```

---

### Option B — Manual

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Edit DATABASE_URL if needed
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
cp .env.example .env            # Fill in Firebase + API URL
npm install
npm run dev
# → http://localhost:3000
```

---

## 🌐 API Reference

Base URL: `http://localhost:8000`

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/posts`         | List posts (`?search=`, `?category=`, `?page=`, `?limit=`) |
| GET    | `/posts/my`      | My posts (`?user_id=` required)      |
| POST   | `/posts`         | Create a post                        |
| DELETE | `/posts/{id}`    | Delete a post (`?user_id=` required) |
| GET    | `/categories`    | List all distinct categories         |

Interactive docs: `http://localhost:8000/docs`

---

## ☁️ Deployment

### Backend → Render

1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** to `backend`
4. **Build command:** `pip install -r requirements.txt`
5. **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable `DATABASE_URL` (SQLite default works on Render's disk, or use a Render Postgres instance)

### Frontend → Vercel

1. Import repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. **Build command:** `npm run build`
4. **Output directory:** `dist`
5. Add all `VITE_*` environment variables in Vercel's dashboard
6. Set `VITE_API_URL` to your Render backend URL

---

## 🐘 PostgreSQL (optional upgrade)

On Render, create a **PostgreSQL** database, copy the **Internal Database URL**, and set:

```
DATABASE_URL=postgresql://user:password@host/dbname
```

The app automatically handles the `postgres://` → `postgresql://` prefix fix for SQLAlchemy compatibility.

---

## 🧑‍💻 Development Notes

- All API calls use `axios` via `src/services/api.ts`
- React Query keys: `posts`, `my-posts`, `categories`
- Mutations auto-invalidate relevant query keys on success
- `useDebounce(400ms)` applied to search input to reduce API calls
- Form validation via `react-hook-form` with inline error messages
- Toast notifications via `react-hot-toast`
