FROM node:14-alpine
WORKDIR /app
COPY package*.json /app/
COPY . .
# COPY .env.qa /app/.env
RUN npm install --production 
RUN npm install -g @adonisjs/cli
RUN npm install @adonisjs/ace@5.1.0 --save
RUN node ace build 
EXPOSE 4206
CMD [ "node", "ace", "serve" ]
