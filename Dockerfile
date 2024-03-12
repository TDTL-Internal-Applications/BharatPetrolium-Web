FROM python:3

# Install required packages
RUN apt-get -y update && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:nginx/stable && \
    apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/* && \
    echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
    chown -R www-data:www-data /var/lib/nginx || true

# Install Python 3.10 and venv
RUN apt-get install -y python3.10 python3.10-venv

# Create and activate virtual environment
RUN python3 -m venv virtual_env
RUN /bin/bash -c "source virtual_env/bin/activate"

# Install Python dependencies
COPY requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt

# Set working directory for Django
WORKDIR /etc/nginx

# Run Django migrations
RUN python manage.py migrate

# Expose the Django application on port 8000
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
