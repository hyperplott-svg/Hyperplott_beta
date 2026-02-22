# HyperPlott

## Overview
HyperPlott is a React-based web application built with Vite and Tailwind CSS v4. It features 3D elements (React Three Fiber), Firebase authentication, and uses the Google Gemini AI API.

## Recent Changes
- 2026-02-22: Configured for Replit environment (Vite host/port settings, deployment)

## Project Architecture
- **Framework**: React 18 with Vite 6
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **3D**: React Three Fiber + Drei
- **Auth**: Firebase
- **AI**: Google Gemini API (@google/genai)
- **Routing**: React Router DOM v7
- **Build output**: `dist/`

## Structure
```
src/
  App.jsx          - Main app component with routing
  main.jsx         - Entry point
  firebase.js      - Firebase configuration
  components/      - Reusable components (3d, common, features, landing, layout)
  context/         - React contexts (AuthContext)
  pages/           - Page components (Landing, Dashboard, Login, Signup, etc.)
  doe/             - Design of Experiment feature (TypeScript)
public/            - Static assets and hyperplott sub-project
```

## Configuration
- Vite dev server: 0.0.0.0:5000 (all hosts allowed for Replit proxy)
- Deployment: Static site (build with `npm run build`, serve `dist/`)

## User Preferences
- None recorded yet
