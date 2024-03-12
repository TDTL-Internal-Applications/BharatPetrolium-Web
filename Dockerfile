FROM python:3

WORKDIR /etc/nginx/sites-available

RUN apt install nginx -y 
RUN apt install python3.10-venv -y  
RUN python3 -m venv virtual_env
RUN source virtual_env/bin/activate
RUN pip install -r requirements.txt
    
COPY . .

RUN python manage.py migrate

EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8001"]
