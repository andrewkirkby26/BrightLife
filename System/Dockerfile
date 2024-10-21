FROM balenalib/raspberrypi3-64-ubuntu-python:3.7.16-build

WORKDIR /

COPY requirements.txt requirements.txt

RUN install_packages network-manager

RUN pip install -r requirements.txt

COPY . ./

CMD ["python3", "-u", "./Launcher.py"]
