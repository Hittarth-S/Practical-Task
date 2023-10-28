# build environment
FROM node:14 as react-build
WORKDIR /app
COPY . ./
RUN npm install -g 
# RUN n stable
RUN npm install --silent --force
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 3000
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
