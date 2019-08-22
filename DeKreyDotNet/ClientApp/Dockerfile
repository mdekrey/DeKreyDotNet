FROM node:10 AS builder

WORKDIR /src
ADD package*.json ./
RUN npm i
ADD . ./
RUN npm run build-dist
WORKDIR /src/dist
RUN npm install --production

FROM node:10

WORKDIR /working
COPY --from=builder /src/dist/ ./
CMD ["npm", "run", "serve"]
