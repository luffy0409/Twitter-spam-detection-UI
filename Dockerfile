# Use an official node image as a base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Install serve globally to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "5000"]
