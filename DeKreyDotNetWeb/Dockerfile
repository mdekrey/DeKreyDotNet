FROM node:10 AS builder

WORKDIR /src
ADD package*.json ./
RUN npm ci
ADD . ./
RUN npm run build-dist
WORKDIR /src/dist
RUN npm ci --production

FROM node:10

WORKDIR /working
COPY --from=builder /src/dist/ ./
CMD ["npm", "run", "serve"]
