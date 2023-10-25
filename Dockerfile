# Use an official Node.js runtime as a parent image 
FROM node:18.14.2-alpine3.17

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Specify the command to run your application
CMD ["node", "server.js"]