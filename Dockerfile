# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies


RUN pip install -r requirements.txt


# Expose the port django runs on
EXPOSE 8000

# Run the Django application
CMD ["python", "BPCL/manage.py", "runserver", "0.0.0.0:8000"]
