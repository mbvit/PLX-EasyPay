# PluxNet Fibre EasyPay Generator - Docker Setup

## Quick Start with Docker

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the application
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -t pluxnet-easypay .

# Run the container
docker run -d -p 3000:3000 --name easypay-app pluxnet-easypay

# View logs
docker logs -f easypay-app

# Stop and remove container
docker stop easypay-app && docker rm easypay-app
```

## Accessing the Application

Once running, visit: http://localhost:3000

## Production Deployment

For production deployment, you may want to:

1. Use a reverse proxy (nginx) in front of the container
2. Set up SSL/TLS certificates
3. Configure environment variables for production
4. Set up monitoring and logging

## Docker Image Details

- **Base Image**: node:18-alpine (minimal Alpine Linux)
- **Multi-stage build**: Reduces final image size
- **Non-root user**: Runs as `nextjs` user for security
- **Standalone output**: Optimized for containerization
- **Port**: 3000

The final image is optimized for size and security, containing only the necessary files to run the Next.js application.
