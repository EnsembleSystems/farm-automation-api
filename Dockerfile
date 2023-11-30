FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

# Run app
CMD [ "npm", "start" ]
