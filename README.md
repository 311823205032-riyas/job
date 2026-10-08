# Student Job Tracker

A beginner-friendly React and Vite mini project for exploring sample internships and tracking applications in the browser.

> The internship listings are sample records for demonstration and are not verified live vacancies.

## Live website

[Open Student Job Tracker](https://311823205032-riyas.github.io/student-job/)

The site is published to GitHub Pages by the workflow in `.github/workflows/deploy.yml` whenever changes are pushed to `main`.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Features

- Search sample internships by job title or company and combine category and location filters.
- Add applications with required-field and email validation.
- Filter applications by status and confirm before deleting.
- Persist tracked applications in browser localStorage.
- Use responsive navigation and layouts on desktop and mobile.

## Project guide

- `src/App.jsx` defines the routes and shared application state and persists records.
- `src/components/` contains the reusable navigation, footer, job card, and search/filter controls.
- `src/pages/` contains the home dashboard, opportunity directory, application form, and tracker.
- `src/index.css` contains the responsive orange-and-white design.