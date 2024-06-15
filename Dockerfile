# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:18-alpine

# Set the working directory in the container
WORKDIR /src/app

COPY ./package*.json ./

RUN npm install --production
RUN npm install @types/mixpanel-browser
RUN npm install @types/react-copy-to-clipboard

ENV NEXT_PUBLIC_BASEPATH=https://test-server.kamayakya.in

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
