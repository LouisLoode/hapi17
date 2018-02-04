# Use Node v7 as the base image.
FROM node:9

RUN npm install lab nodemon -g

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /backend

WORKDIR /backend

# Install dependencies
COPY package.json .
RUN yarn install

# Expose our server port.
EXPOSE 9000