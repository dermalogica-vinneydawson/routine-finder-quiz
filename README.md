# Routine Finder Quiz

A single-page React quiz for Dermalogica that guides users through skincare questions and redirects to a personalized results page with their answers as URL parameters.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4**
- **Framer Motion** (installed but not used for animations; kept for potential future use)

## Flow

1. **Home** → CTA "DISCOVER YOUR ROUTINE"
2. **Intro (Q1)** → First name, last name, age
3. **Q2–Q5** → Skincare questions (timing, concern, tier, sensitivity)
4. **Email** → Optional email capture (can skip)
5. **Redirect** → Results URL with query params

## Project Structure

```
src/
├── App.tsx              # Root component, state, navigation
├── main.tsx             # Entry point
├── index.css            # Global styles, theme, CSS animations
├── constants/
│   ├── style.ts         # Design tokens (colors, gradients)
│   └── urls.ts          # CDN URLs, results redirect URL
├── data/
│   └── quizData.ts      # Questions, options, educational blurbs
├── components/
│   ├── HomeScreen.tsx   # Landing page
│   ├── IntroStep.tsx    # Q1: name + age
│   ├── QuizScreen.tsx   # Q2–Q5 questions
│   ├── EmailScreen.tsx  # Email capture
│   ├── TypewriterText.tsx   # Character-by-character typewriter effect
│   ├── LightbulbIcon.tsx    # "Why we ask" icon
│   └── ui/
│       ├── BackButton.tsx
│       ├── DesktopProgressBar.tsx
│       └── FixedNavBars.tsx
```

## Quick Start

```bash
npm install
npm run dev      # Development server (http://localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Shopify Implementation Notes

### URLs to Update

- **`src/constants/urls.ts`**: Replace `BACKGROUND_IMAGE`, `AVATAR_IMAGE`, and `RESULTS_URL` with your Shopify CDN URLs and results page.
- **`index.html`**: Update the `<link rel="preload">` href to match your background image URL.

### Quiz Content

- **`src/data/quizData.ts`**: Edit `QUIZ_QUESTIONS`, `AGE_OPTIONS`, and `Q1_EDUCATIONAL_BLURB` for copy changes. `QUESTION_ORDER` controls the question sequence.

### Styling

- **`src/constants/style.ts`**: Design tokens (accent color `#5b6670`, gradients, etc.). Update for rebranding.
- **`src/index.css`**: Theme variables in `@theme` block. Tailwind v4 uses these for utilities.

### Embedding in Shopify

This app can be embedded as:

1. **App embed** – Build and host the static files; embed via a Shopify app or theme app extension.
2. **Theme section** – Port components into Liquid/React and use as a section.
3. **Standalone page** – Deploy to a subdomain or path; link from the store.

The results page receives answers as query params, e.g.:

```
?firstName=Jane&lastName=Doe&age=25-34&timing=Morning+and+night&concern=...&tier=...&sensitivity=...&email=...
```

## Animations

- **Typewriter** – `TypewriterText` component (vanilla React + `setTimeout`) for question headings.
- **Entrance** – CSS `@keyframes fadeSlideUp` with `.animate-fade-in` and `.stagger-N` classes.
- **Reduced motion** – `@media (prefers-reduced-motion: reduce)` disables animations in `index.css`.

## State & Navigation

- **QuizState** – `firstName`, `lastName`, `age`, `timing`, `concern`, `tier`, `sensitivity`, `email?`
- **viewStep** – 0 = intro, 1–4 = Q2–Q5, 5 = email
- **Back button** – Preserves answers; navigates to previous step or home
