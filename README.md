# ⚛️ React Learning Tutorial

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-764abc?logo=redux)](https://redux-toolkit.js.org/)

## 🎯 Overview

This project is a **comprehensive React learning platform** designed to teach React concepts through interactive examples and hands-on demos. Each concept is presented with:

- 📖 **Clear explanations** of the concept
- 💻 **Live code examples** you can interact with
- 🎨 **Visual demonstrations** of how things work
- 📝 **Code snippets** showing best practices
- ✅ **Summary sections** highlighting key takeaways

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-tutorial-u

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
react-tutorial-u/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   └── Sidebar.jsx         # Navigation sidebar
│   │   └── ui/
│   │       └── ConceptCard.jsx     # Reusable card component
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page
│   │   └── concepts/
│   │       ├── UseStatePage.jsx    # useState tutorial
│   │       ├── UseEffectPage.jsx   # useEffect tutorial
│   │       ├── UseRefPage.jsx      # useRef tutorial
│   │       ├── UseReducerPage.jsx  # useReducer tutorial
│   │       └── ReduxPage.jsx       # Redux Toolkit tutorial
│   ├── stores/
│   │   ├── UserContextProvider.jsx # Context API provider
│   │   ├── useUser.js              # Custom hook for context
│   │   ├── ReduxProvider.jsx       # Redux provider
│   │   └── features/
│   │       └── counter/
│   │           └── counterSlice.js # Redux slice
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── tailwind.config.js              # Tailwind configuration
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library |
| **Vite** | 7.2.4 | Build tool & dev server |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **Redux Toolkit** | 2.11.2 | State management |
| **React Router** | 7.12.0 | Client-side routing |

### Why These Technologies?

- **React 19**: Latest features and performance improvements
- **Vite**: Lightning-fast HMR and optimized builds
- **Tailwind CSS v4**: Modern utility-first styling with Vite plugin
- **Redux Toolkit**: Simplified Redux with best practices built-in
- **React Router v7**: Modern routing with nested routes

---