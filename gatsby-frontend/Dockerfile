FROM node:12 AS builder

WORKDIR /src
ADD package*.json ./
RUN npm ci
ADD . ./
RUN npm run build

FROM nginx as prod
COPY --from=builder /src/public/ /usr/share/nginx/html
