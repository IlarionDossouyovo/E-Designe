FROM php:8.2-apache

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Enable mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /workspace/project/E-Graphisme

# Copy project files
COPY . /workspace/project/E-Graphisme

# Expose port
EXPOSE 8000