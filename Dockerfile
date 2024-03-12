FROM python:3


RUN apt-get -y update
RUN add-apt-repository -y ppa:nginx/stable && \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx
RUN apt install python3.10-venv -y  
RUN python3 -m venv virtual_env
RUN source virtual_env/bin/activate
RUN pip install -r requirements.txt
    
WORKDIR /etc/nginx

RUN python manage.py migrate

EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8001"]
