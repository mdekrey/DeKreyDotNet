FROM node:12 AS builder

WORKDIR /src
ADD package*.json ./
RUN npm ci
ADD . ./
RUN npm run build

FROM gatsbyjs/gatsby
COPY --from=builder /src/public /pub
RUN echo "if ('serviceWorker' in navigator) { navigator.serviceWorker.ready.then(function (registration) { registration.unregister(); }); }" > /pub/service-worker.js
RUN echo '{"short_name": "DeKreyDotNet","name": "DeKreyDotNet","icons": [{"src": "favicon-32x32.png","sizes": "64x64 32x32 24x24 16x16","type": "image/png"}],"start_url": "./","display": "standalone","theme_color": "#000000","background_color": "#ffffff"}' > /pub/manifest.json
