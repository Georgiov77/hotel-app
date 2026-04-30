# 🏨 Hotel App — Σύστημα Διαχείρισης Κρατήσεων

Εφαρμογή desktop για διαχείριση κρατήσεων μικρού ξενοδοχείου 14 δωματίων. Λειτουργεί offline με τοπική αποθήκευση δεδομένων.

---

## Tech Stack

- **Electron** — desktop app shell
- **React + Vite** — UI layer (εκτελούνται σε ξεχωριστές διεργασίες)
- **SQLite + better-sqlite3** — τοπική βάση δεδομένων
- **Zustand** — global state management
- **Plain CSS + BEM** — styling

---

## Getting Started

### Prerequisites

- Node.js 20+ (LTS)

### Installation

```bash
git clone https://github.com/Georgiov77/hotel-app
cd hotel-app
npm install
```

### Running Locally

```bash
npm run dev
```

Εκκινεί ταυτόχρονα τον Vite dev server και το Electron window.

### Building

```bash
npm run build
```

---

## Project Structure

```
hotel-app/
├── electron/                 # Main process (Node.js)
│   ├── main.cjs              # Entry point, δημιουργεί το window
│   ├── preload.cjs           # Secure bridge (contextBridge)
│   └── ipc/                  # IPC handlers ανά domain
├── src/                      # Renderer process (React)
│   ├── components/           # UI components (dumb, ένα φάκελο ανά component)
│   ├── pages/                # Page-level components
│   ├── hooks/                # Custom hooks (όλη η λογική εδώ)
│   ├── services/             # Business logic layer
│   ├── stores/               # Zustand stores
│   ├── config/               # App configuration (navigation, pageTitles)
│   ├── styles/               # Global CSS variables
│   └── utils/                # Shared utility functions
├── index.html
├── vite.config.js
└── package.json
```

---

## Architecture

Η εφαρμογή ακολουθεί layered architecture:

```
Component → Hook → Service → Repository → SQLite
```

- **Components** — rendering μόνο, χωρίς business logic
- **Hooks** — data fetching, state, side effects
- **Services** — business logic
- **Repositories** — αλληλεπίδραση με τη βάση δεδομένων

Η επικοινωνία μεταξύ Electron main και renderer γίνεται αποκλειστικά μέσω IPC (`invoke`/`handle`) και `contextBridge`.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Εκκίνηση σε development mode |
| `npm run build` | Build για production |
| `npm run preview` | Preview του production build |
| `npm run lint` | Έλεγχος ESLint |
| `npm run lint:fix` | Αυτόματη διόρθωση ESLint errors |
