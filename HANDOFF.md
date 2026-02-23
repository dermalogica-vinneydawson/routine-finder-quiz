# Development Agency Handoff

This document provides the information needed for a development agency to take over, deploy, and maintain the Routine Finder Quiz.

## Overview

The Routine Finder Quiz is a production-ready React SPA that guides users through skincare questions and redirects to a results page with personalized recommendations. It is designed for Shopify integration but can be deployed standalone.

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

## Setup

```bash
# Clone the repository
git clone <repository-url>
cd routine-finder-quiz

# Install dependencies
npm install

# Run development server
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Build & Deploy

```bash
# Production build
npm run build
```

Output is in `dist/`. Serve the contents statically (e.g., via Netlify, Vercel, GitHub Pages, or a Shopify CDN).

### Deployment Options

1. **Static hosting** – Upload `dist/` contents to any static host. Ensure the server is configured for SPA routing (index.html for all routes) if using client-side routing.
2. **Shopify** – Embed as an app embed, theme section, or standalone page. See README for URLs to configure.
3. **Subdomain** – Deploy to a subdomain (e.g., `quiz.dermalogica.com`) and link from the main store.

## Configuration

| File | Purpose |
|------|---------|
| `src/constants/urls.ts` | Replace `BACKGROUND_IMAGE`, `AVATAR_IMAGE`, `RESULTS_URL` with production URLs |
| `src/constants/style.ts` | Design tokens (colors, gradients) for rebranding |
| `src/data/quizData.ts` | Quiz questions, options, copy |
| `index.html` | Preload link for background image URL |

## Environment Variables

None required. All configuration is in source files. For future use, Vite supports `VITE_*` prefixed env vars in `.env` files.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Testing Checklist

- [ ] Home → Intro → Q2 → Q3 → Q4 → Q5 → Email → Redirect
- [ ] Back navigation preserves answers
- [ ] Typewriter effect on question headings
- [ ] Staggered entrance animations
- [ ] Mobile and desktop layouts
- [ ] Reduced motion preference respected

## Support

For questions about the implementation, refer to the README and inline comments in the codebase.
