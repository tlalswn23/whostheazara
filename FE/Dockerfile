FROM node:18.16.1
WORKDIR /FE
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-l","8080","-s", "dist"]
