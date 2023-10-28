FROM node:14
#set user direcorty to 
WORKDIR /server
# copy package json
COPY package.json .
# run npm install 
RUN npm install 
#copy rest of the application 
COPY . .
COPY .env .env
# envs
ENV PORT 8080
# expose working port
EXPOSE $PORT

# start project 

CMD ["npm","start"]
