# Portfolio — MERN stack

**M**ongoDB · **E**xpress · **R**eact · **N**ode — this project is built and branded around the MERN stack.

The API is **Express + Node** with a **React (Vite)** frontend. For zero-config local runs, profile/projects/experience are served from **`data/*.json`** (MongoDB-style documents without a live DB). Contact submissions go to **`data/contacts.json`** (gitignored). You can swap the file layer for MongoDB + Mongoose using the same route shapes.

## Local run

```bash
cp .env.example .env   # optional
npm run install-all
npm run dev:all
```

- **Site:** [http://localhost:5173](http://localhost:5173) (Vite proxies `/api` → `:5000`)
- **API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

Or two terminals: `npm run dev` and `cd client && npm run dev`.

## Vercel deployment (frontend only)

GitHub Pages/Vercel cannot run the Express API from the same static build, so deploy the **frontend** to Vercel and host the **API** separately.

In Vercel project settings (from the repo root):

- Install command: `npm run install-all`
- Build command: `npm run build`
- Output directory: `client/dist`
- Environment variable (required if API is separate): `VITE_API_URL`
  - Set it to your API origin (example: `https://portfolio-api.onrender.com`)
  - It must NOT include `/api` and should have no trailing slash.

Then on your API host, set `ALLOWED_ORIGINS` to include your deployed Vercel site origin(s), e.g. `https://your-vercel-app.vercel.app`.

If you want to use the project mutation endpoints from an external admin tool, set `ADMIN_API_KEY` on the API host as well.

## Edit content

| File | Purpose |
|------|---------|
| `data/profile.json` | Name, bio, skills, social links |
| `data/projects.json` | Projects (`_id` must be unique string) |
| `data/experience.json` | Timeline items |
| `data/contacts.json` | Auto-created; contact form writes here (not in git) |

## GitHub Pages

Static **client only** on Pages; host the **Express API** elsewhere (Render, Railway, VPS) and set GitHub secret **`VITE_API_URL`**. Set **`ALLOWED_ORIGINS`** on the server for your Pages URL.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health + storage hint |
| GET | `/api/profile` | Profile from `data/profile.json` |
| GET | `/api/experience` | From `data/experience.json` |
| GET | `/api/projects` | Query: `category`, `featured=true`, `status` |
| GET | `/api/projects/:id` | By `_id` |
| POST | `/api/contact` | Saves to `contacts.json`, optional email |
| POST/PUT/DELETE | `/api/projects`… | Mutates `projects.json` |

## License

MIT
