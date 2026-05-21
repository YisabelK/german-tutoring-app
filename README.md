# YK German Tutoring

A personal practice app for learning German vocabulary and exam-style fill-in-the-blank questions. Built for one-on-one tutoring sessions, with a slide-like UI that works well when sharing your screen in class.

## Features

- **Levels** — A1 through C1; browse quizzes by level
- **Fill-in-the-blank** — Type answers in sentence gaps, submit, and reveal correct answers
- **Vocabulary list** — Review word lists tied to each quiz
- **Shuffle** — Randomize question order within a quiz

## Getting started

```bash
npm install
npm run dev
```

## Quiz data (not in Git)

Quiz JSON files under `src/data/quizzes/` are **private study material** and are excluded from GitHub via `.gitignore`.

To add a quiz locally, place a JSON file in the level folder (e.g. `c1/lesenTeil2.json`) and register it in that folder’s `index.js`.
