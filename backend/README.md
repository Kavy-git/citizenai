# 🏛️ Citizen AI — Backend API

Node.js + Express backend for the Citizen AI government scheme discovery platform.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd citizen-ai-backend
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and fill in:
```
ANTHROPIC_API_KEY=your_key_from_console.anthropic.com
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### 3. Run the backend
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts at: **http://localhost:5000**

---

## 🔗 Frontend Integration

After starting the backend, update your frontend's **`src/hooks/useChatApi.js`** with the file provided (`useChatApi.js` in this zip).

Also create a `.env` in your **frontend** folder:
```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 📡 API Endpoints

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server status + scheme stats |

### Schemes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schemes/categories` | All 7 categories |
| GET | `/api/schemes/states` | All Indian states |
| GET | `/api/schemes/search?q=keyword` | Search all schemes |
| GET | `/api/schemes/:category` | Schemes by category |
| GET | `/api/schemes/:category?state=Karnataka&maxIncome=200000` | With filters |
| GET | `/api/schemes/scheme/:id` | Single scheme by ID |
| POST | `/api/schemes/eligibility` | Match schemes to user profile |

### Chat (AI)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to Citizen AI |

---

## 📋 Example API Calls

### Get all student schemes
```bash
GET http://localhost:5000/api/schemes/students
```

### Search schemes
```bash
GET http://localhost:5000/api/schemes/search?q=scholarship
```

### Filter by state and income
```bash
GET http://localhost:5000/api/schemes/farmers?state=Karnataka&maxIncome=200000
```

### Check eligibility
```bash
POST http://localhost:5000/api/schemes/eligibility
Content-Type: application/json

{
  "age": 22,
  "income": 150000,
  "gender": "female",
  "occupation": "student",
  "state": "Karnataka"
}
```

### Chat with Citizen AI
```bash
POST http://localhost:5000/api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "I am a student from Karnataka with income below 2 lakh. What schemes am I eligible for?" }
  ]
}
```

---

## 🌐 Deployment

### Deploy to Render (Free)
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, set Build: `npm install`, Start: `npm start`
4. Add environment variables in Render dashboard
5. Update `FRONTEND_URL` to your Vercel frontend URL

### Deploy to Railway
1. Install Railway CLI: `npm install -g @railway/cli`
2. `railway login && railway init && railway up`
3. Add env vars in Railway dashboard

---

## 📁 Folder Structure

```
citizen-ai-backend/
├── server.js              ← Entry point
├── config/
│   └── index.js           ← All config & env vars
├── routes/
│   ├── health.js
│   ├── schemes.js
│   └── chat.js
├── controllers/
│   ├── healthController.js
│   ├── schemesController.js
│   └── chatController.js
├── middleware/
│   ├── rateLimiter.js
│   └── errorHandler.js
├── data/
│   └── schemes.js         ← All 30+ schemes database
├── .env.example
├── .gitignore
└── package.json
```

---

## 🔒 Security Features
- **Helmet** — secure HTTP headers
- **CORS** — only your frontend domain allowed
- **Rate limiting** — 100 req/15min globally, 20 chat req/15min
- **API key hidden** — Anthropic key stays on server, never exposed to browser
- **Input validation** — all inputs validated before processing
