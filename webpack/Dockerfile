FROM node:9.11.1-alpine

WORKDIR /app

COPY package*.json npm-shrinkwrap.json webpack.config.js development.js .babelrc ./

RUN npm install
RUN npm install -g forever
RUN npm install -S socket.io
RUN npm install socket.io-client --save
RUN npm install --save-dev babel-plugin-transform-decorators-legacy
RUN npm install @material-ui/core -S
RUN npm install --save-dev webpack-dev-middleware webpack-hot-middleware
RUN npm install -S express
RUN npm install -S redis


# CMD ["node_modules/.bin/webpack-dev-server", "--inline", "--hot"]