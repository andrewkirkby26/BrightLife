//
//  ViewController.swift
//  PropelUI
//
//  Created by Patrick Sweeney on 9/19/17.
//  Copyright © 2017 Protedyne. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, UIScrollViewDelegate {
    
    @IBOutlet weak var textPath: UILabel!
    var webView: WKWebView!
    
    let userDefaults = UserDefaults.standard
    var timer: Timer = Timer()
    
    override func loadView() {
        webView = WKWebView(frame: CGRect(x: 0 , y: 0, width: 0, height: 0))    // 0,0 should maximize. Default anyway
        webView.navigationDelegate = self
        webView.scrollView.delegate = self
        webView.scrollView.isScrollEnabled = false;
        view = webView
        // TODO: Zoom view?
        webView.isHidden = true
        print("Assigned webView");
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        print("Start of viewDidLoad");
        //UserDefaults.standard.register(defaults: <#T##[String : Any]#>())
        
        let userURL = URL(string: "https://brightlife-c7d8d.web.app/home?selectedView=home")!
        webView.load(URLRequest(url:userURL))
        print("Loaded URL \(userURL)!")
        
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        timer.invalidate()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("viewWillAppear")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    @objc func onDeviceCheck() {
        let batteryLeft = self.checkBattery()
        // Run javascript in webview
        webView.evaluateJavaScript("setDeviceLevels(\(batteryLeft),'100')", completionHandler: nil)
        //print("Battery Level Is \(batteryLeft)")
    }
    
    func checkBattery() -> Float {
        return UIDevice.current.batteryLevel * 100.0
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("Finished navigating to url");
        webView.isHidden = false
    }
    
    func webView(_ webView: WKWebView,
      didFail navigation: WKNavigation!,
      withError error: Error) {
        print("Failed navigating to url");
    }
    
    // Disable zooming in webView
    func viewForZooming(in: UIScrollView) -> UIView? {
        return nil;
    }
}

