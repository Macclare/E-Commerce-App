FROM node:12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:12-alpine AS server
WORKDIR /app
COPY package* ./
# ARG DATABASE_URL
# ENV DATABASE_URL $DATABASE_URL
RUN npm install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/public/uploads ./public/uploads
COPY --from=builder ./app/.env ./.env
COPY --from=builder ./app/bin ./bin
COPY --from=builder ./app/lib ./lib
COPY --from=builder ./app/src ./src
COPY --from=builder ./app/database.sqlite3 ./database.sqlite3
COPY --from=builder ./app/.sequelizerc ./.sequelizerc
EXPOSE 3500
CMD ["npm", "start"]