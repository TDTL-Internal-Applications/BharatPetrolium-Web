FROM python:3

WORKDIR /etc/nginx/sites-available

RUN apt install nginx -y 
    sudo apt install python3.10-venv
    python3 -m venv virtual_env
    source virtual_env/bin/activate
    pip install -r requirements.txt
    
COPY . .

RUN python manage.py migrate

EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8001"]
