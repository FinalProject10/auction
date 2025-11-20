# Frontend Docker Setup

## Prerequisites
- Docker and Docker Compose installed
- `.env.local` file configured in the `front/` directory

## Quick Start

1. **Navigate to frontend directory:**
   ```bash
   cd front
   ```

2. **Create `.env.local` file** (if not exists) with required variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

3. **Start service:**
   ```bash
   docker-compose up -d
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Stop service:**
   ```bash
   docker-compose down
   ```

## Services

- **frontend**: Next.js application (port 3000)

## Network

- `frontend-network`: Isolated network for frontend service

## Development Mode

For development with hot reload, use:
```bash
npm run dev
```

Docker is recommended for production deployments.

