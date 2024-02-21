FROM node:21-alpine3.18

WORKDIR /new-app
COPY package*.json /new-app/
COPY . .

RUN npm install
RUN npm install -g nodemon

EXPOSE 4000

CMD ["npm", "run", "dev"]
