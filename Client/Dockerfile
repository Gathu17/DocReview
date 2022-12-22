FROM node:16.10.0 as builder-step

WORKDIR /Client

COPY package*.json /Client/

RUN npm install 

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]