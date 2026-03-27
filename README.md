## Live Demo

> **Frontend:** https://posts-catalog.vercel.app/*
> **Backend API:** https://posts-catalog-api.onrender.com/*
> **API Docs:** `{BACKEND_URL}/docs`

## Tech stack
frontend: React 18, typescript, vite
styling: tailwind css
auth; firebase (email/password)
http:axios
backend: Python 3.12, FastAPI
ORM: SQAlchemy 2
Database: Sqlite (default)/ postfresSQL (plus)
container: docker, docker-compose
deploy: render (backend), vercal (frontend)




### Backend — `backend/.env`

`DATABASE_URL` SQLAlchemy db connection string `sqlite:///./posts.db`

**SQLite (default):**
```
DATABASE_URL=sqlite:///./posts.db
```


---

### Frontend — `frontend/.env`


`VITE_API_URL`                       Backend base URL                
`VITE_FIREBASE_API_KEY`              Firebase API key                
`VITE_FIREBASE_AUTH_DOMAIN`          Firebase auth domain            
`VITE_FIREBASE_PROJECT_ID`           Firebase project ID             
`VITE_FIREBASE_STORAGE_BUCKET`       Firebase storage bucket         
`VITE_FIREBASE_MESSAGING_SENDER_ID`  Firebase messaging sender ID  
`VITE_FIREBASE_APP_ID`               Firebase app ID                 



##  Local Development

### Prerequisites
- Node.js 20+
- Python 3.12+
- (Optional) Docker & docker-compose


### Option  — Manual

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate       
pip install -r requirements.txt
cp .env.example .env          
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
cp .env.example .env           
npm install
npm run dev
# → http://localhost:3000
```

