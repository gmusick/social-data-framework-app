FROM mhart/alpine-node

ENV SHELL /bin/bash

WORKDIR /usr/local/social-data-framework

COPY package.json .
RUN npm install

COPY ./src ./src

EXPOSE 3000
CMD ["npm", "start"]
