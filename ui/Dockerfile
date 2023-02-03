FROM node:18 AS build-node

WORKDIR /src
ADD package*.json ./
RUN npm ci
ADD . ./
ARG DOMAIN=https://dekrey.net
ARG GIT_HASH=HEAD
ENV GIT_HASH=$GIT_HASH
RUN npm run lint
RUN npm run build -- --site $DOMAIN

FROM ghcr.io/mdekrey/static-files-server:local
COPY --from=build-node /src/dist ./wwwroot

RUN echo $GIT_HASH > ./wwwroot/git-version.txt
