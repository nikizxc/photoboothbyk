# photoboothbyk — A Photobooth Application
[**Live Demo**](https://photoboothbyk.online)

photoboothbyk is a client-side photobooth application that lets users capture photos, customize their photobooth strips, and download their creations as PNG or GIF.

## Features
  - **Studio** - Choose a layout, apply filters, and take photos
  - **Customization** - Customize photobooth strips and download as PNG or GIF
  - **PWA Support** - Install the application on desktop and mobile devices, with offline support

## Tech Stack
  - **Language**: TypeScript
  - **Frontend**: React, Vite, TailwindCSS
  - **Hosting**: Netlify

# Quick Start
## Prerequisites
  - Node.js 24+

## Installations
  1. Clone the repository
```
git clone https://github.com/nikizxc/photobooth.git
```
  2. Install dependencies
```
npm install
```
  3. Development
```
npm run dev
```
The application will be available at `http://localhost:5173/`.

  4. Production
```
npm run build
npm run preview
```
The application will be available at `http://localhost:4173/`

# Repository Structure
```text
photoboothbyk/
├── src/
│   ├── components/          # Custom UI and shadcn/ui components
│   ├── pages/               # Application pages (Home, PrivacyPolicy, Studio, Customization)
│   ├── lib/                 # Utility functions and shared configurations
│   ├── services/            # Application services and logic
│   ├── types/               # TypeScript type definitions
│   ├── App.css              # Main application styles
│   ├── App.tsx              # Main routing setup
│   └── main.tsx             # React entry point
├── public/                  # Static assets (backgrounds, stickers)
├── components.json          # shadcn/ui configuration
├── eslint.config.ts         # ESLint configuration
├── tsconfig.json            # Main TypeScript configuration
├── tsconfig.app.json        # TypeScript configuration for the application
├── tsconfig.node.json       # TypeScript configuration for Node.js files
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies, scripts, and metadata
├── package-lock.json        # Locked dependency versions
└── README.md
```


