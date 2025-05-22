# Build stage
FROM node:20.10.0-alpine3.19 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Transpile the code to the dist-server directory
RUN npm run build

# Production stage
FROM node:20.10.0-alpine3.19 AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the transpiled code and required node_modules from the builder stage
COPY --from=builder /app/dist-server ./dist-server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port the app will run on
EXPOSE 3002

# Define environment variables for production
ENV NODE_ENV=production

# Command to run the server
CMD ["npm", "run", "server"]
