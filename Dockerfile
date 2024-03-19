FROM docker.io/library/python:3.8-slim-buster

RUN apt-get update && apt-get install -y \
    pkg-config \
    # Add any other build dependencies here if needed
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .


CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000"]
