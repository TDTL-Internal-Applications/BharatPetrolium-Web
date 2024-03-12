FROM python:3

WORKDIR /etc/nginx/sites-available

RUN apt install nginx -y 
    apt install python3.10-venv -y
    python3 -m venv virtual_env
    source virtual_env/bin/activate
    
COPY . .

RUN python manage.py migrate

EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8000"]
