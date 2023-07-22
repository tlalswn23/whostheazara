FROM node:18.16.1
WORKDIR /FE
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["serve", "-l","8080","-s", "dist"]
