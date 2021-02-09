FROM cypress/base:14.2.0
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN $(npm bin)/cypress verify
RUN ["npm", "run", "cy:run"]
#RUN ["npx", "cypress", "run"]
#RUN ["npx", "cypress", "run", "--spec='cypress/integration/exercises/scroll.spec.js'"]

