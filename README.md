# Shortify

A fast, modern URL shortener — transform long URLs into clean, shareable short links in seconds.

---

## Features

- Shorten any long URL to a compact, shareable link
- Instant redirect on short link access
- Clean and responsive web interface
- RESTful API backend
- Copy-to-clipboard support

---

## Tech Stack

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | React 19, TypeScript, Vite    |
| Backend  | Python 3.14, FastAPI, Uvicorn |

---

## Project Structure

```
Shortify/
├── backend/          # FastAPI application
│   ├── main.py       # Entry point & route definitions
│   └── pyproject.toml
└── frontend/         # React + TypeScript SPA
    ├── src/
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    └── package.json
```

---

## Getting Started

### Prerequisites

- Python 3.14+
- Node.js 18+
- [uv](https://github.com/astral-sh/uv) (recommended) or pip

---

### Backend Setup

```bash
cd backend

# Install dependencies (using uv)
uv sync

# Start the development server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Reference

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| `GET`  | `/`             | Health check                 |
| `POST` | `/shorten`      | Create a short URL           |
| `GET`  | `/{short_code}` | Redirect to the original URL |

### Shorten a URL

**Request**

```http
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com/very/long/url/that/needs/shortening"
}
```

**Response**

```json
{
  "short_url": "http://localhost:8000/abc123",
  "original_url": "https://example.com/very/long/url/that/needs/shortening"
}
```

---

## Development

### Run linting (frontend)

```bash
cd frontend
npm run lint
```

### Build for production (frontend)

```bash
cd frontend
npm run build
```

---

## License

This project is licensed under the [MIT License](LICENSE).
