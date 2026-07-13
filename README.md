# create-nxa 🚀

A professional, feature-rich CLI tool to instantly bootstrap new Next.js projects with a modern starter template. Save hours of boilerplate setup.

[![npm version](https://img.shields.io/npm/v/create-nxa.svg?style=flat-flat)](https://www.npmjs.com/package/create-nxa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features Included

*   **Framework**: Next.js 16 (App Router) with Turbopack for ultra-fast compilation.
*   **Styling**: Tailwind CSS v4 with modern UI layouts and responsive designs.
*   **State Management**: Redux Toolkit (`@reduxjs/toolkit` and `react-redux`) pre-configured with a custom base API.
*   **Authentication**: Built-in `AuthContext` provider and hooks for authentication flow (Register, Login, logout & session persistent).
*   **Utilities**: Preloaded helper utilities like `formatDate`, `useDebounce`, `useLocalStorage`, `tailwind-merge` and `clsx`.
*   **Linting & Formatting**: ESLint and Prettier configured out of the box.
*   **Ready-to-use Layouts**: Includes Authentication Layout, Dashboard Layout with sidebar, and Common Public Layout.

---

## 🚀 Quick Start

Run the following command in your terminal to bootstrap a new application:

```bash
npx create-nxa <your-project-name>
```

For example:
```bash
npx create-nxa my-dashboard-app
```

---

## 📁 Directory Structure

```text
my-app/
├── src/
│   ├── app/
│   │   ├── (authLayout)/          # Login & Register routes
│   │   ├── (dashboardLayout)/     # Admin Dashboard overview
│   │   └── (commonLayout)/        # Public landing routes
│   ├── components/                # Shared layout & UI components
│   ├── constants/                 # Route paths and app-wide constants
│   ├── context/                   # AuthContext providers
│   ├── hooks/                     # Custom React hooks (e.g., useLocalStorage)
│   ├── lib/                       # Third-party configurations (Axios, API clients)
│   ├── providers/                 # Combined provider wrapper
│   ├── redux/                     # Redux toolkit store and API slices
│   ├── schemas/                   # Validation schemas (Zod or custom)
│   ├── types/                     # TypeScript interfaces and types
│   └── utils/                     # Formatting & helper functions
├── public/                        # Static assets (images, icons)
├── .env.example                   # Template environment variables
├── eslint.config.mjs              # Linting configurations
└── tsconfig.json                  # TypeScript compiler options
```

---

## 🛠️ Available Scripts

Once your project is created, navigate to the folder and run:

### Development Server
```bash
npm run dev
```
Starts the app in development mode with Turbopack at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Compiles and builds the application for production.

### Start Production Server
```bash
npm run start
```
Starts the built application in production mode.

### Linting
```bash
npm run lint
```
Lints and checks for style or formatting issues.

---

## 📝 License

This project is licensed under the MIT License.
