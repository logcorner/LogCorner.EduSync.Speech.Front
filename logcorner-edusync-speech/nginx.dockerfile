##### Stage 1
FROM node:14.17.0 as node
LABEL author="Gora LEYE"
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
ARG configuration=${configuration}
RUN npm run build -- --output-path=./dist --configuration $configuration 

##### Stage 2
FROM nginx:latest
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

