# Shortify

A fast, modern URL shortener — transform long URLs into clean, shareable short links in seconds.

## Features

- Shorten any long URL to a compact, shareable link
- Instant redirect via short code
- Click tracking and analytics per link
- View all shortened URLs with creation date and click count
- Copy-to-clipboard support
- Clean, responsive single-page interface
- Dockerized for one-command deployment

## Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React 19, TypeScript, Vite       |
| Backend  | Python 3.14, FastAPI, SQLAlchemy |
| Database | SQLite                           |
| Infra    | Docker, Docker Compose           |

## Project Structure

```
Shortify/
├── backend/
│   ├── main.py            # API routes
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # DB engine & session
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api/urlApi.ts  # Axios API client
│   │   ├── components/    # ShortenForm, ResultCard, UrlTable
│   │   └── types/         # TypeScript interfaces
│   ├── Dockerfile
│   ├── index.html
│   └── package.json
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Python 3.14+
- Node.js 18+
- [uv](https://github.com/astral-sh/uv) (recommended) or pip

### Using Docker (recommended)

```bash
docker compose up --build
```

- Frontend: `http://localhost:4173`
- Backend API: `http://localhost:8000`

### Manual Setup

**Backend**

```bash
cd backend
uv sync
uvicorn main:app --reload
```

API available at `http://localhost:8000`.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:5173`.

## API Reference

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| `POST` | `/api/shorten`            | Create a short URL           |
| `GET`  | `/api/{short_code}`       | Redirect to the original URL |
| `GET`  | `/api/stats/{short_code}` | Get URL stats (clicks, date) |
| `GET`  | `/api/all/urls`           | List all shortened URLs      |

### Shorten a URL

**Request**

```http
POST /api/shorten
Content-Type: application/json

{
  "original_url": "https://example.com/very/long/url/that/needs/shortening"
}
```

**Response**

```json
{
  "original_url": "https://example.com/very/long/url/that/needs/shortening",
  "short_code": "abc123",
  "created_at": "2026-04-17T12:00:00",
  "click_count": 0
}
```

## Development

```bash
# Lint frontend
cd frontend && npm run lint

# Build frontend for production
cd frontend && npm run build
```

## Contributing

Contributions are welcome. Please follow these guidelines:

1. **Fork** the repository and create your branch from `main`.
2. Keep changes focused — one feature or fix per pull request.
3. Follow the existing code style and project structure.
4. Test your changes locally before submitting.
5. Write clear, concise commit messages.
6. Open a pull request with a brief description of what changed and why.

For bugs or feature requests, please [open an issue](../../issues) first to discuss the proposed change.

## License

This project is licensed under the [MIT License](LICENSE).
