# Lendsqr Frontend Engineer Assessment

A pixel-perfect implementation of the Lendsqr Admin Console built with React, TypeScript, and SCSS.

## Pages Built

| Page | Route | Description |
|---|---|---|
| Login | `/` | Email/password login with validation |
| Dashboard | `/dashboard` | Stats overview |
| Users | `/dashboard/users` | 500 mock users with filter & pagination |
| User Details | `/dashboard/users/:id` | Full profile stored/retrieved via localStorage |

## Tech Stack

- React 18 + TypeScript
- SCSS (BEM-style, variables-driven)
- React Router v6
- localStorage for user detail persistence
- Jest + React Testing Library (23 passing tests)

## Getting Started

```bash
npm install
npm start       # Dev server at http://localhost:3000
npm test        # Run all tests
npm run build   # Production build
```

## Architecture Notes

**Mock Data**: 500 users generated in `src/data/mockUsers.ts` — no external API dependency needed.

**localStorage**: Saving user on "View Details" click; UserDetails page reads from storage first, falls back to mock array.

**SCSS**: All design tokens in `src/styles/_variables.scss`. Each component owns its SCSS file scoped with BEM naming.

**Responsiveness**: Sidebar collapses on mobile, table scrolls horizontally, grids reflow at 768px and 1024px breakpoints.
