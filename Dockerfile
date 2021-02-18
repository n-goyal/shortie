FROM node:12.20.1
# 1. creating working directory
WORKDIR /usr/src/app
# 2. install devDependencies
COPY package*.json ./
# 3. run `npm i --only=production` for production
RUN npm i --only=production
# 4. bundle app source
COPY . .
# EXPOSE 2390

ENV NODE_ENV=production

CMD [ "npm", "start" ]