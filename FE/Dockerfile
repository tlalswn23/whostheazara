FROM node:18.16.1
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-l","8080","-s", "build"]
