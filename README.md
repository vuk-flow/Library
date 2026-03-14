# Biblioteka (Library Management System)

A full-stack web application for managing libraries and their book collections. Users can create libraries, add/edit/delete libraries, and within each library manage books (add, delete, filter by author, pagination).

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **ORM:** Prisma 7 (with PostgreSQL adapter)
- **Database:** PostgreSQL
- **Other:** CORS, dotenv, axios (client-side only)

### Frontend
- **Framework:** Next.js 16 (Pages Router)
- **UI:** Chakra UI 3, Emotion
- **Language:** TypeScript
- **State:** Zustand (modal state), React state/hooks
- **Forms:** React Hook Form
- **HTTP:** Axios
- **Other:** react-icons, next-themes

### DevOps / Tooling
- **Containers:** Docker, Docker Compose (backend, frontend, PostgreSQL)
- **Linting/Formatting:** ESLint, Prettier
- **Git hooks:** Husky, lint-staged

---

## Project Structure

```
LibraryProject/
├── backend/                 # Express API
│   ├── prisma/
│   │   └── schema.prisma    # DB models (library, book, author, section)
│   ├── src/
│   │   ├── lib/             # Prisma client
│   │   ├── routes/          # library, author, book
│   │   ├── schemas/         # Validation/types
│   │   └── index.ts         # App entry, CORS, mount routes
│   ├── Dockerfile
│   └── package.json
├── frontend/                # Next.js app
│   ├── src/
│   │   ├── components/      # UI, modals, tables, layout
│   │   ├── pages/           # Pages Router (index, libraries, [LibraryID]/[LibraryName])
│   │   ├── store/           # Zustand (modalStore)
│   │   ├── types/           # TS types
│   │   └── utils/           # apiCaller, common
│   ├── Dockerfile
│   └── package.json
└── README.md
```

---

## What You Can Do in the App

- **Libraries**
  - View list of all libraries.
  - Add a new library (name, address).
  - Edit a library (name, address).
  - Delete a library (with confirmation).
- **Books (inside a library)**
  - View paginated list of books (name, date_published, author, section).
  - Add a book (name, published date, author name/country/DOB, section); backend creates author and section if needed.
  - Delete a book (with confirmation).
  - Filter books by author (client-side filter on current page data).
- **Navigation**
  - Home redirects to `/libraries`.
  - Clicking a library opens its detail page with books (route: `/libraries/[LibraryID]/[LibraryName]`).
  - Back button returns to library list.

---

## API Endpoints

Base URL: `http://localhost:8000` (or backend container URL when using Docker).

### Health
| Method | Path   | Description        |
|--------|--------|--------------------|
| GET    | `/`    | Simple hello text |

### Libraries (`/libraries`)
| Method | Path                    | Description        | Body (JSON)     |
|--------|-------------------------|--------------------|-----------------|
| GET    | `/libraries`            | List all libraries | —               |
| POST   | `/libraries/add-library`| Create library     | `name`, `address` |
| PATCH  | `/libraries/edit-library/:id` | Update library | `name?`, `address?` |
| DELETE | `/libraries/delete-library/:id` | Delete library | —         |

### Authors (`/authors`)
| Method | Path        | Description        |
|--------|-------------|--------------------|
| GET    | `/authors`  | List all authors   |

### Books (`/books`)
| Method | Path                          | Description              | Query / Body |
|--------|-------------------------------|--------------------------|--------------|
| GET    | `/books`                      | List all books           | —            |
| GET    | `/books/by-library`           | Books in a library       | `id`, `page?`, `limit?`, `filter?` (author name) |
| GET    | `/books/:id`                  | Get one book by ID       | —            |
| POST   | `/books/add-book`             | Add book to a library   | Query: `libraryId`. Body: `name`, `publishedDate`, `authorName`, `authorCountry`, `authorDateOfBirth`, `section` |
| DELETE | `/books/delete-book/:id`      | Delete book by ID        | —            |

**Example – add book**
- URL: `POST /books/add-book?libraryId=<uuid>`
- Body:  
  `{ "name", "publishedDate", "authorName", "authorCountry", "authorDateOfBirth", "section" }`

**Example – books by library (paginated)**
- URL: `GET /books/by-library?id=<library-uuid>&page=1&limit=20&filter=<author name optional>`

---

## Access and Configuration

- **Frontend:** Runs on port **3000**, base path `/lib-system` (e.g. `http://localhost:3000/lib-system`).
- **Backend:** Runs on port **8000**; CORS allows `http://localhost:3000`.
- **Database:** PostgreSQL; connection string is set via `DATABASE_URL` (e.g. in backend `.env`).
- **API client:** Frontend uses `apiCaller` with base URL `http://localhost:8000/` (see `frontend/src/utils/apiCaller.ts`). For Docker or other hosts, this base URL may need to be made configurable (e.g. env variable).

---

## How to Run

### Prerequisites
- Node.js (v20+ recommended)
- PostgreSQL (or use Docker for DB only)
- (Optional) Docker & Docker Compose for full containerized run

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set `DATABASE_URL` (PostgreSQL).
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev` (or `prisma db push`) to apply schema.
6. `npm run dev` — server runs on port 8000.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` — app runs on port 3000; open `http://localhost:3000/lib-system`.

### Docker (all services)
- From repo root: `docker-compose up --build`
- Ensures backend, frontend, and PostgreSQL run with defined ports and volumes. Run migrations inside the backend container if needed (e.g. `docker-compose exec backend npx prisma migrate dev`).

---

## Summary

- **Done:** CRUD for libraries and books, list authors, Prisma + PostgreSQL, Next.js + Chakra UI 3, modals (add/edit library, add book, delete library/book), toasts, pagination and filter by author, Docker setup, README in English.
- **Tech:** Express 5, Next.js 16, Chakra UI 3, Prisma 7, TypeScript, Zustand, React Hook Form, Axios.
- **Access:** Frontend at `http://localhost:3000/lib-system`, API at `http://localhost:8000`; no auth — open API for local use.
