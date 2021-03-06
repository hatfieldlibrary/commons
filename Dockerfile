FROM node:8.9.11

# This Dockerfile assumes that you have build production code using npm run build:prod

EXPOSE 3000
WORKDIR /

COPY package.json /
ENV NODE_ENV=production
RUN npm prune
COPY index.js index.js
COPY ./src/server /src/server
COPY ./dist /dist
COPY ./node_modules /node_modules

CMD ["node", "index.js"]
