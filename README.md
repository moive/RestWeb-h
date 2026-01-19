# Project Setup Guide

## Prerequisites

- Node.js 18+
- Docker & Docker Compose

## Environment Setup

Create `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=postgresql://postgres:123456@localhost:5433/TODO

POSTGRES_USER=postgres
POSTGRES_DB=TODO
POSTGRES_PORT=5433
POSTGRES_PASSWORD=123456
```

**Important notes:**

- Use `DATABASE_URL` (not `POSTGRES_URL`)
- Use `POSTGRES_PASSWORD` (with "T", not `POSGRES_PASSWORD`)
- Port is `5433` (mapped from Docker's 5432)

## Installation

```bash
npm install
npx prisma generate
npx prisma db push
```

## Running Docker Database

```bash
# Start PostgreSQL container
docker-compose up -d

# Check status
docker-compose ps

# Stop container
docker-compose down

# Stop and delete data
docker-compose down -v
```

## Running the Application

```bash
npm run dev    # Development with hot-reload
npm start      # Production
npm run build  # Build TypeScript
```

## Project Structure

```
├── .env
├── docker-compose.yml
├── prisma/schema.prisma
├── src/
└── postgres/          # Docker volume for data
```

## Common Issues

| Error                           | Solution                                         |
| ------------------------------- | ------------------------------------------------ |
| PrismaClientInitializationError | Check `DATABASE_URL` and Docker container status |
| Connection refused              | Verify Docker is running and port is correct     |
| Variable not found              | Use `DATABASE_URL`, not `POSTGRES_URL`           |

## Verify Setup

```bash
node --version              # Check Node.js
docker-compose ps           # Check PostgreSQL container
npx prisma db push          # Test database connection
npm run dev                 # Start application
```

## Useful Commands

```bash
npx prisma studio          # Web interface for database
npx prisma migrate dev     # Run migrations
npm run lint              # Code linting
```

# Notes

- Generate key and cert

  `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt`
