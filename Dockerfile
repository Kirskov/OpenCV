# Use the official Nginx image as base
FROM nginx:alpine

# Copy the static website files to Nginx's default public directory
COPY . /usr/share/nginx/html/

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 