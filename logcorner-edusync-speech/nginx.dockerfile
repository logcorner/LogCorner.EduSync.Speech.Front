##### Stage 1
FROM node:latest as node
LABEL author="Gora LEYE"
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
ARG configuration=docker
RUN npm run build -- --output-path=./dist --configuration $configuration

##### Stage 2
FROM nginx:latest
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

