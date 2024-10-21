from flask import Flask, render_template, send_from_directory
from flask import send_from_directory


class WifiREST:
    
    app = Flask(__name__,static_folder='interface/browser')

    system  = None
    wifiUtil = None
    
    def init(self, sys):
        global system
        system = sys
        self.wifiUtil = system.getWifiUtil()
        self.app.run(host="0.0.0.0", port=80)
    
    @app.route('/', defaults=dict(filename=None))
    @app.route('/<path:filename>', methods=['GET', 'POST'])
    def index(filename):
        filename = filename or 'index.html'
        return send_from_directory('interface/browser', filename)

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
    
    
    
    