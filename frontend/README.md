# 🏛️ Citizen AI — Frontend Setup Guide

> Complete React + Vite frontend for the Citizen AI Government Scheme Discovery Platform

---

## 📁 FOLDER STRUCTURE

```
citizen-ai/
│
├── public/
│   └── favicon.svg                    ← Browser tab icon
│
├── src/
│   ├── main.jsx                       ← React entry point
│   ├── App.jsx                        ← Root component + routing
│   │
│   ├── styles/
│   │   ├── variables.css              ← ALL design tokens (colors, spacing, etc.)
│   │   ├── global.css                 ← Reset + base styles
│   │   └── app.css                    ← Layout, grid, animations
│   │
│   ├── data/
│   │   └── schemes.js                 ← All scheme data (your database)
│   │
│   ├── context/
│   │   ├── SchemeContext.jsx           ← Global scheme state
│   │   └── ChatContext.jsx             ← Global chatbot state
│   │
│   ├── hooks/
│   │   ├── useSchemeFilter.js          ← Reusable filter logic
│   │   └── useChatApi.js               ← Claude API integration
│   │
│   ├── utils/
│   │   └── helpers.js                 ← Shared utility functions
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx + .css       ← Top navigation
│   │   │   └── Footer.jsx + .css       ← Site footer
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx + .css       ← Reusable button
│   │   │   ├── SchemeCard.jsx + .css   ← Individual scheme display card
│   │   │   ├── SearchBar.jsx + .css    ← Search input component
│   │   │   ├── FilterBar.jsx + .css    ← Search + state + income filters
│   │   │   ├── PageHeader.jsx + .css   ← Category page header
│   │   │   ├── EmptyState.jsx + .css   ← "No results" UI
│   │   │   └── CategoryPage.jsx + .css ← Reusable template for all 7 category pages
│   │   │
│   │   └── chatbot/
│   │       └── ChatBot.jsx + .css      ← Floating AI assistant widget
│   │
│   └── pages/
│       ├── Home/
│       │   ├── Home.jsx               ← Landing page
│       │   └── Home.css
│       │
│       ├── Students/
│       │   └── Students.jsx           ← Uses CategoryPage template
│       ├── Farmers/
│       │   └── Farmers.jsx
│       ├── Women/
│       │   └── Women.jsx
│       ├── Jobs/
│       │   └── Jobs.jsx
│       ├── Seniors/
│       │   └── Seniors.jsx
│       ├── Disabled/
│       │   └── Disabled.jsx
│       ├── Startups/
│       │   └── Startups.jsx
│       │
│       ├── EligibilityChecker/
│       │   ├── EligibilityChecker.jsx  ← Profile form + matched schemes
│       │   └── EligibilityChecker.css
│       │
│       └── About/
│           ├── About.jsx
│           └── About.css
│
├── index.html                         ← HTML template
├── vite.config.js                     ← Vite configuration
└── package.json                       ← Project dependencies
```

---

## ⚡ SETUP FROM SCRATCH — 4 STEPS

### Step 1 — Install Node.js
Download from: https://nodejs.org (choose LTS version)

Verify:
```bash
node --version   # v20+
npm --version    # 10+
```

### Step 2 — Create the Project
```bash
npm create vite@latest citizen-ai -- --template react
cd citizen-ai
npm install
npm install react-router-dom
```

### Step 3 — Replace the files
Copy ALL files from this folder into your project, maintaining the same folder structure.

### Step 4 — Run it
```bash
npm run dev
```

Open: http://localhost:5173

---

## 🔧 DEPENDENCIES

| Package | Purpose |
|---------|---------|
| react | UI framework |
| react-dom | DOM rendering |
| react-router-dom | Page routing |
| vite | Build tool |

No other dependencies needed. All styling is pure CSS with CSS variables.

---

## 📦 BUILD FOR PRODUCTION

```bash
npm run build     # Creates dist/ folder
npm run preview   # Preview production build
```

---

## 🚀 DEPLOY FREE

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
OR drag-drop the `dist/` folder at: https://vercel.com/new

### Netlify
Drag-drop `dist/` folder at: https://netlify.com

---

## 🤖 AI CHATBOT

The chatbot calls the Anthropic Claude API. For local development, the API key is handled by the platform (claude.ai).

For production deployment, create `.env`:
```
VITE_ANTHROPIC_API_KEY=your_key_here
```

Update `useChatApi.js`:
```js
headers: {
  'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
  ...
}
```

⚠️ Never commit `.env` to Git. Add it to `.gitignore`.

---

## 🎨 CUSTOMIZATION

All colors, fonts, and spacing are in:
```
src/styles/variables.css
```

To change the theme color (currently green):
```css
--color-primary: #your-color;
--color-primary-dark: #your-darker-color;
```

To add more schemes, edit:
```
src/data/schemes.js
```

---

## 📱 BROWSER SUPPORT

Chrome, Firefox, Safari, Edge — all modern browsers.
Mobile responsive out of the box.
