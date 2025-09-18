# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Install netcat for database connectivity checks (optional)
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript)
RUN npm ci

# Copy source code
COPY . .

# Copy and make startup script executable
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Build TypeScript
RUN npm run build

# Remove devDependencies to keep image slim
RUN npm prune --production

# Expose port
EXPOSE 3000

# # Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:3000/ || exit 1

# Start the application with seeding
CMD ["/app/start.sh"]