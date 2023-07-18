FROM node:18-alpine
WORKDIR /web/backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npx sequelize-cli db:migrate
CMD ["npm","run","build"]