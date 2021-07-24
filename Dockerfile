FROM node:lts-alpine
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.203
WORKDIR /app
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
RUN yarn global add expo-cli
RUN yarn cache clean && npm cache clean --force
COPY package.json . 
RUN yarn install
RUN yarn upgrade @redux-offline/redux-offline@native
COPY . . 
CMD yarn start

