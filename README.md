# Easy URL Shortener

A full-stack URL Shortener application with analytics tracking.

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Bootstrap 5, Recharts |
| Backend    | Java 21, Spring Boot 3, Spring Data JPA |
| Database   | MySQL 8                                 |
| Docs       | Swagger / OpenAPI 3                     |

---

## Project Structure

```
url-shortener/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Spring Boot 3 REST API
├── database/
│   ├── schema.sql     # DDL
│   └── seed.sql       # Sample data
└── README.md
```

---

## Prerequisites

- Java 21+
- Node.js 18+
- MySQL 8+
- Maven 3.9+

---

## MySQL Setup

```sql
-- 1. Create the database
CREATE DATABASE url_shortener;

-- 2. Run schema
mysql -u root -p url_shortener < database/schema.sql

-- 3. Seed sample data
mysql -u root -p url_shortener < database/seed.sql
```

---

## Backend Setup

### Configuration

Edit `backend/src/main/resources/application.properties` or use environment variables:

| Variable      | Default           | Description           |
|---------------|-------------------|-----------------------|
| `DB_HOST`     | `localhost`       | MySQL host            |
| `DB_PORT`     | `3306`            | MySQL port            |
| `DB_NAME`     | `url_shortener`   | Database name         |
| `DB_USER`     | `root`            | MySQL username        |
| `DB_PASSWORD` | `root`            | MySQL password        |
| `SERVER_PORT` | `8080`            | Backend port          |
| `APP_BASE_URL`| `http://localhost:8080` | Base URL for short links |

### Run

```bash
cd backend
mvn spring-boot:run
```

Backend starts at: http://localhost:8080  
Swagger UI: http://localhost:8080/swagger-ui.html

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: http://localhost:5173

The Vite dev server proxies `/api` requests to `http://localhost:8080`.

---

## API Reference

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | `/api/urls`                 | Create a short URL                 |
| GET    | `/api/urls?page=0&size=10`  | Paginated list of all URLs         |
| GET    | `/api/urls/{id}/analytics`  | Daily click analytics for one URL  |
| GET    | `/api/urls/stats`           | Global click + creation statistics |
| GET    | `/{shortCode}`              | Redirect to original URL (302)     |

### POST /api/urls

**Request:**
```json
{ "originalUrl": "https://www.example.com" }
```

**Response (201 Created):**
```json
{
  "id": 1,
  "originalUrl": "https://www.example.com",
  "shortCode": "aB3xYz",
  "shortUrl": "http://localhost:8080/aB3xYz",
  "createdAt": "2024-01-15T10:30:00",
  "clickCount": 0,
  "lastAccessedAt": null
}
```

---

## Features

- ✅ Shorten any HTTP/HTTPS URL
- ✅ Unique 6-character alphanumeric short codes
- ✅ Copy short URL to clipboard
- ✅ One-click open in new tab
- ✅ Redirect with click tracking (302)
- ✅ Analytics chart per URL (daily clicks, last 30 days)
- ✅ Global statistics chart (clicks + creations by day)
- ✅ Pagination (10 URLs per page)
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Swagger UI at `/swagger-ui.html`
- ✅ Global exception handling with structured errors

---

## Assumptions & Trade-offs

1. **Short codes** are generated randomly (6 chars, alphanumeric). On collision, it retries up to 10 times. For a production system at scale, a distributed counter or Base62 encoding of the DB ID would be preferred.

2. **URL validation** checks for valid URL format and requires `http`/`https` protocol. It does not perform a live reachability check.

3. **Click tracking** uses a `click_events` table for per-event history while `urls.click_count` stores the running total for fast reads.

4. **Analytics** group click events by day using a native MySQL query (last 30 days). The statistics chart shows the last 14 days of data.

5. **CORS** is configured to allow all origins for development convenience. In production, restrict `allowed-origins` to specific domains.

6. **`ddl-auto=none`** is used — schema must be created manually via `schema.sql`. This avoids accidental data loss.
