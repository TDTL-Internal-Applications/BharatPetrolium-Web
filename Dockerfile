FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt



COPY. /app
