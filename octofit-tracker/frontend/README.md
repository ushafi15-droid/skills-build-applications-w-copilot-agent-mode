# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap, and React Router to show
activities, the leaderboard, teams, users, and workouts from the API.

## API configuration

When running the frontend in Codespaces, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` using the value of the Codespaces
`CODESPACE_NAME` environment variable:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this setting to the frontend as `import.meta.env.VITE_CODESPACE_NAME`.
It must be defined for a production build served outside the Vite development
server. If it is missing or invalid, the frontend uses `http://localhost:8000`
as a safe API fallback.

During development, the browser requests same-origin `/api/` URLs and Vite
proxies them to `http://localhost:8000`. This avoids cross-origin browser
requests and requires the backend to be running locally on port `8000`.
Restart the Vite development server after changing `.env.local` or `vite.config.js`.

## Development

```bash
npm run dev --prefix octofit-tracker/frontend
```

The API should be available on port `8000`.
