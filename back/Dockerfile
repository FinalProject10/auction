FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application code
COPY . .

# Expose port (default 3001, can be overridden with PORT env var)
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]

