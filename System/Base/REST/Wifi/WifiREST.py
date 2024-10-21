from flask import Flask, render_template
import os
from flask import Blueprint

class WifiREST:
    
    app = Flask(__name__,template_folder='interface')

    system  = None
    wifiUtil = None
    
    def init(self, sys):
        global system
        system = sys
        self.wifiUtil = system.getWifiUtil()
        self.app.run(host="0.0.0.0", port=80, debug=True)
        
    # @app.hook('after_request')
    # def enable_cors():
    #     response.headers['Access-Control-Allow-Origin'] = '*'
    #     response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    #     response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
        
    @app.route('/')
    def index():
        return render_template('index.html')

    # @app.route("/")
    # def hello_world():
    #     return system.getStatus().getState()
    
    @app.route("/list")
    def list():
        return system.getWifiUtil().listAvailableConnections()
    
    @app.route("/connect/<SSID>/<PASSWORD>")
    def connectToWifi(SSID, PASSWORD):
        return str(system.getWifiUtil().connectToWifi(SSID, PASSWORD))
    
    @app.route("/online")
    def online():
        return str(system.getWifiUtil().isConnected())
    
    @app.route("/current")
    def current():
        return system.getWifiUtil().getWifiName()
    
    
    
    