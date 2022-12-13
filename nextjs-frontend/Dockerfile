FROM node:16 AS build-node

WORKDIR /src
ADD package*.json ./
RUN npm ci
ADD . ./
ARG DOMAIN=https://dekrey.net
ENV NEXT_PUBLIC_DOMAIN=$DOMAIN
RUN npm run build
RUN npm run export

FROM ghcr.io/mdekrey/static-files-server
COPY --from=build-node /src/out ./wwwroot
