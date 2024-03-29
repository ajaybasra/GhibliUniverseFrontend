# Base image
FROM node:18.14.2-alpine as base

# Set the working directory in the container
WORKDIR /app

ARG name
ENV ENV $name

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the app's source code to the container
COPY . .

FROM base as test
RUN npm test -- --watchAll=false

# Build the React app for production
FROM base as build
RUN chmod u+x ./ops/scripts/build.sh && ./ops/scripts/build.sh

FROM nginx:1.23.3-alpine 
EXPOSE 80
COPY --from=build /app/build/ /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]