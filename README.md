A small frontend app built with Next.js (App Router), TypeScript, and Tailwind CSS that showcases product listing, filtering, favorites, and theming.


npm install
npm run dev

Open: http://localhost:3000


Product Explorer Dashboard

This project demonstrates practical frontend engineering skills using Next.js (App Router), TypeScript, and Tailwind CSS.

The focus is on clean architecture, state management, and real-world UI patterns, rather than visual polish.

src/
├── app/              # Routes (App Router)
├── components/       # UI components
├── context/          # Theme & Favorites
├── hooks/            # Data fetching
├── lib/              # API helpers
└── types/            # TypeScript types


* What This Project Shows

.Clean component separation (Navbar, ProductCard, context providers)

.Client-side data handling (search, filters, sorting, pagination)

.Thoughtful state management using React Context

.Sensible trade-offs based on dataset size

.Basic accessibility considerations

.Theme handling with persistence

Implemented Features

.Product listing from a public API

.Responsive grid layout

.Search by product title

.Category-based filtering

.Price-based sorting

.Favorites with persistence

.Pagination

.Dark / light mode using global theme context

.Keyboard navigation and ARIA labels

Technical Choices & Rationale

.Client-side filtering & pagination
.The dataset is small, making client-side operations appropriate and simpler.

React Context over Redux
Global state is limited and does not justify heavier state management.

CSS-variable based theming
Decouples theming from framework configuration and scales well.

Next.js App Router
Enables clean routing and component organization.

Assumptions & Trade-offs

No backend pagination or filtering

No automated tests (scope-limited)

Accessibility is basic but intentional

Potential Extensions

Server-side filtering and pagination

URL-driven filters

Component testing

Skeleton loaders and performance tuning
