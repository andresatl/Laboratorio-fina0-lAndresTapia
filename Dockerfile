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

# Use Alpine Linux 3.18.4 as the base image
FROM alpine:3.18.4

# Update package lists and install necessary packages
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        bash \
        curl \
        ca-certificates \
    && \
    update-ca-certificates

# Add your application-specific installation and configuration steps here
# For example, installing additional packages, copying application files, etc.

# Clean up unnecessary files to reduce image size
RUN rm -rf /var/cache/apk/*

# Set default command or entrypoint for the container
CMD ["sh"]

