# Experiment 10 — CI/CD with GitHub Actions + Firebase Hosting

## Objective
Configure CI/CD automation with GitHub Actions and deploy a React app on Firebase with a custom domain.

---

## Project Structure

```
Expertment-10/
├── .github/
│   └── workflows/
│       ├── ci.yml          ← Part (a): Run tests on every push
│       └── cd.yml          ← Part (b): Build artifact + Deploy to Firebase
├── react-firebase-app/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.test.jsx    ← Vitest tests
│   │   ├── utils.js
│   │   ├── firebase.js     ← Firebase SDK init
│   │   ├── main.jsx
│   │   └── setupTests.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── firebase.json           ← Firebase Hosting config
├── .firebaserc             ← Firebase project link
└── .gitignore
```

---

## Part (a) — CI Workflow (`ci.yml`)

**Trigger:** Every push to any branch and every pull request to `main`

**Steps:**
1. Checkout code
2. Setup Node.js 20
3. `npm ci` — install dependencies
4. `npm test` — run Vitest tests

This ensures the project builds and all tests pass before any merge.

---

## Part (b) — CD Workflow (`cd.yml`)

**Trigger:** Push to `main` branch only

**Steps:**
1. Checkout + install + test (same as CI)
2. `npm run build` — creates production bundle in `react-firebase-app/dist/`
3. Upload `dist/` as a **GitHub Actions build artifact** (retained 7 days)
4. Deploy to **Firebase Hosting** using `FirebaseExtended/action-hosting-deploy`

---

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Hosting** from the left sidebar
4. Register a Web App and copy the config values

### 2. Add GitHub Secrets
Go to your GitHub repo → **Settings → Secrets and variables → Actions** and add:

| Secret Name | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | From Firebase config |
| `VITE_FIREBASE_AUTH_DOMAIN` | From Firebase config |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | From Firebase config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | From Firebase config |
| `VITE_FIREBASE_APP_ID` | From Firebase config |
| `FIREBASE_SERVICE_ACCOUNT` | JSON key from Firebase → Project Settings → Service Accounts |

### 3. Get Firebase Service Account Key
1. Firebase Console → Project Settings → Service Accounts
2. Click **Generate new private key** → download JSON
3. Paste the entire JSON content as the `FIREBASE_SERVICE_ACCOUNT` secret

### 4. Update `.firebaserc`
Replace `<your-firebase-project-id>` with your actual Firebase project ID.

### 5. Push to GitHub
```bash
git init
git add .
git commit -m "feat: experiment 10 - CI/CD with GitHub Actions + Firebase"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

The CD workflow will trigger automatically and deploy to Firebase.

---

## Custom Domain Setup (Firebase Hosting)

1. Firebase Console → Hosting → **Add custom domain**
2. Enter your domain (e.g., `myapp.example.com`)
3. Firebase gives you two DNS records (TXT for verification + A/CNAME for routing)
4. Add those records in your domain registrar's DNS settings
5. Wait for propagation (up to 24h) — Firebase auto-provisions SSL

---

## Running Locally

```bash
cd react-firebase-app
npm install
npm test        # run tests
npm run dev     # start dev server
npm run build   # production build → dist/
```

---

## How CI/CD Flow Works

```
git push (any branch)
        │
        ▼
  ci.yml triggers
  ├── npm ci
  └── npm test ✅

git push (main branch)
        │
        ▼
  cd.yml triggers
  ├── npm ci
  ├── npm test ✅
  ├── npm run build → dist/
  ├── Upload dist/ as GitHub Artifact 📦
  └── Deploy to Firebase Hosting 🚀
              │
              ▼
     https://<project-id>.web.app
     https://<your-custom-domain>
```
