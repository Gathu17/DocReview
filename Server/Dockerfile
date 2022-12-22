FROM node:16-alpine AS development
ENV NODE_ENV development

WORKDIR /Server

COPY package.json .
COPY package-lock.json .

RUN npm install 


COPY . .

EXPOSE 5000

CMD ["node", "app.js"]