FROM node:7.0.0

WORKDIR /usr/local/social-data-framework

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
