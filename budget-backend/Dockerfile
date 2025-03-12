# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (you can change it based on your app's port)
EXPOSE 3000

# Define the command to run your app using node
CMD [ "npm", "start" ]
