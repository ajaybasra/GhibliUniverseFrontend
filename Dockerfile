# Base image
FROM node:18.14.2-alpine as base

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the app's source code to the container
COPY . .

# Build the React app for production
FROM base as build
RUN npm run build

FROM nginx:1.23.3-alpine
EXPOSE 80
COPY --from=build /app/build/ /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]