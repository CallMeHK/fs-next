# To start with docker, not docker-compose:
# 

FROM node:12

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080

# CMD npm run ready
CMD npm run dev

