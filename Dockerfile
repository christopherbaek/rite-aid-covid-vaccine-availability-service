FROM mcr.microsoft.com/playwright:bionic

# Install Headless Chrome
#RUN apk update && apk add --no-cache nmap && \
#    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
#    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
#    apk update && \
#    apk add --no-cache \
#    chromium \
#    harfbuzz \
#    "freetype>2.8" \
#    ttf-freefont \
#    nss


# Create app directory
WORKDIR /opt/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the application port
EXPOSE 3000/tcp

# Start the app
CMD [ "node", "./src/index.js" ]
