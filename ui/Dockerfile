FROM node:18-alpine AS build-node
RUN apk add --no-cache brotli

WORKDIR /src
ADD package*.json ./
RUN npm ci
ADD . ./
ARG DOMAIN=https://dekrey.net
ARG GIT_HASH=HEAD
ENV GIT_HASH=$GIT_HASH
RUN npm run lint
RUN npm run build -- --site $DOMAIN

WORKDIR /src/dist

RUN echo $GIT_HASH > ./git-version.txt
RUN find . -type f -exec gzip -k "{}" \; -exec brotli -k "{}" \;

FROM ghcr.io/mdekrey/static-files-server
COPY --from=build-node /src/dist ./wwwroot

