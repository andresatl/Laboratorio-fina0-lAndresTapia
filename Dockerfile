#FROM node:16.17.0-alpine as builder
#WORKDIR /app
#COPY ./package.json .
#COPY ./yarn.lock .
#RUN yarn install
#COPY . .
#ARG TMDB_V3_API_KEY
#ENV VITE_APP_TMDB_V3_API_KEY=${TMDB_V3_API_KEY}
#ENV VITE_APP_API_ENDPOINT_URL="https://api.themoviedb.org/3"
#RUN yarn build

#FROM nginx:stable-alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /app/dist .
#EXPOSE 80
#ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM alpine:3.18.4
ADD file:756183bba9c7f4593c2b216e98e4208b9163c4c962ea0837ef88bd917609d001 in /
CMD ["/bin/sh"]
