# TaskFlow Pro

TaskFlow Pro is a production-ready full-stack team task manager for planning projects, assigning work, tracking status, and reviewing team analytics. It includes JWT authentication, role-based access control, Prisma with SQLite, a responsive React dashboard, Recharts visualizations, filtering, pagination, modals, confirmation dialogs, and toast notifications.

## Features

- Signup, login, logout, JWT auth, and protected routes
- Admin and member roles
- Admin project and task management
- Member task-status updates for assigned tasks
- Dashboard cards, bar chart, and pie chart
- Search and filters by project, status, priority, assignee, and task/project title
- Responsive sidebar and mobile drawer
- Dark mode toggle
- Seeded demo users, projects, and tasks

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios, React Hook Form, Zod, Lucide React, Recharts, React Hot Toast
- Backend: Node.js, Express, JWT, bcryptjs, express-validator
- Database: SQLite with Prisma ORM

## Project Structure

```text
team-task-manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── .env.example
└── README.md
```

## Installation

Use Node.js 20 LTS or newer. Prisma and Vite will not install correctly on very old Node versions.

1. Install backend dependencies:

```bash
cd server
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

If `npm run prisma:migrate` shows a blank `Schema engine error` on Windows, apply the included SQLite migration directly:

```bash
npm run prisma:apply
npm run seed
npm run dev
```

2. Install frontend dependencies in another terminal:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

The API runs on `http://localhost:5000` and the client runs on `http://localhost:5173`.

## Environment Variables

Backend `server/.env`:

```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="replace-with-a-long-random-secret"
CLIENT_URL="http://localhost:5173"
```

Frontend `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Demo Credentials

- Admin: `admin@example.com` / `Admin123!`
- Member: `member@example.com` / `Member123!`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/dashboard/stats`

## Deployment

### Backend on Railway

Create a Railway Node service from the `server` directory. Add `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, and `PORT` environment variables. Use `npm install`, `npm run prisma:generate`, `npm run prisma:migrate`, and `npm start`. SQLite stores the database at `server/prisma/dev.db`; for persistent production storage, attach a Railway volume or use Railway's persistent storage options.

### Frontend on Vercel

Create a Vercel project from the `client` directory. Set `VITE_API_URL` to your Railway API URL plus `/api`, for example `https://your-api.railway.app/api`. Build command: `npm run build`. Output directory: `dist`.

## Screenshots

Add screenshots of the landing page, dashboard, projects, tasks, and mobile drawer after running the app locally or deploying.
