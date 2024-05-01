FROM python:3.9
# FROM balenalib/raspberrypi3-python:3.7-sid

COPY . /
WORKDIR /

RUN apt update
# RUN apt install hostapd dnsmasq

RUN pip3 install --upgrade pip

# RUN pip3 install RPi.GPIO

RUN pip3 install -r requirements.txt

CMD ["python3", "-u", "./Launcher.py"]