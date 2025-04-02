FROM node:20-alpine
#ENV add environment variable
RUN npm install

CMD ["npm","run","dev"]