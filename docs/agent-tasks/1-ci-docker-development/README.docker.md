# Docker Development Setup

This project uses Docker Compose for local development with PostgreSQL and includes support for VS Code debugging.

## Prerequisites

- Docker and Docker Compose installed
- VS Code with the "JavaScript Debugger" extension (built-in)

## Getting Started

1. **Copy the environment file:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` if you need to customize any values.

2. **Start the services:**

   ```bash
   docker-compose up
   ```

   Or run in detached mode:

   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Next.js app: http://localhost:3000
   - PostgreSQL: localhost:5432

## Debugging with VS Code

Debug setup not working yet...

1. **Start the Docker containers:**

   ```bash
   docker-compose up
   ```

2. **Attach the debugger:**
   - Open VS Code
   - Go to the "Run and Debug" panel (Cmd+Shift+D / Ctrl+Shift+D)
   - Select "Docker: Attach to Node" from the dropdown
   - Click the green play button or press F5

3. **Set breakpoints:**
   - Open any TypeScript/JavaScript file in your project
   - Click in the gutter to the left of line numbers to set breakpoints
   - Your breakpoints will be hit when that code executes

## Useful Commands

### View logs:

```bash
docker-compose logs -f
```

### View logs for a specific service:

```bash
docker-compose logs -f nextjs
docker-compose logs -f postgres
```

### Restart services:

```bash
docker-compose restart
```

### Stop services:

```bash
docker-compose down
```

### Stop services and remove volumes (WARNING: deletes database data):

```bash
docker-compose down -v
```

### Rebuild containers after dependency changes:

```bash
docker-compose up --build
```

### Access PostgreSQL CLI:

```bash
docker-compose exec postgres psql -U postgres -d irongirl
```

### Run database migrations (example):

```bash
docker-compose exec nextjs npm run migrate
```

## Troubleshooting

### Port already in use

If you get an error that port 3000 or 5432 is already in use:

- Stop the conflicting service, or
- Change the port in `.env` file

### Node modules issues

If you experience issues with node_modules:

```bash
docker-compose down
docker-compose up --build
```

### Database connection issues

Ensure the PostgreSQL service is healthy before the Next.js app starts. The `docker-compose.yml` includes a health check and dependency configuration.

### Hot reload not working

The docker-compose setup includes volume mounts for hot reloading. If changes aren't being detected:

- Ensure you're editing files in the mounted directory
- Check Docker Desktop resource settings (File Sharing)
- Restart the containers

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:

- `DATABASE_URL`: Connection string for PostgreSQL
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: PostgreSQL credentials
- `NEXT_PORT`: Port for the Next.js development server
- `POSTGRES_PORT`: Port for PostgreSQL
