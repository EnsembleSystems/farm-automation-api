FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080
EXPOSE 5432

# Run app
CMD [ "/bin/bash", "-c", "npm run setup; node ./dist/server.js" ]
