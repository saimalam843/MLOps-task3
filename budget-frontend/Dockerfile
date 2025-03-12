# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Serve the app using a lightweight server
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Define the command to serve the app
CMD ["serve", "-s", "build", "-l", "5000"]
