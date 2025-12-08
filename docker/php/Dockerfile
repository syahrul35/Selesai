FROM php:8.3.0-fpm

# Install MySQL extensions (install sekali saja!)
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Install dependencies
RUN apt-get update && apt-get install -y \
    zip unzip curl git \
    libpng-dev libonig-dev libxml2-dev \
    libzip-dev \
    && docker-php-ext-install mbstring zip exif pcntl bcmath

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
