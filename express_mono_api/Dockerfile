FROM node:20.14-alpine

# Add your Node.js app files
WORKDIR /app
COPY ./  /app/
RUN npm install

# Expose ports
EXPOSE  10601

# Start SSH and MySQL services
CMD ["npm", "run", "prod"]