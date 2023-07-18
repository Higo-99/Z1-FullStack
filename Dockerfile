FROM node:18-alpine
WORKDIR /web/backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","run","build"]