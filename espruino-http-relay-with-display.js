var WIFI_SSID = "Hyperspace Gate Project";
var WIFI_PASSWORD = "wlanpasswort";
var SERVER_PORT = 3001;

var RELAY_PIN = D5;
var RELAY_STATE_ON = 0;  // yes, ON is zero 
var RELAY_STATE_OFF = 1; // yes, OFF is one
var RELAY_PUSH_TIME = 500;

function onInit() {

  var wifi = require("Wifi");
  var http = require("http");

  function relayOn() {
    digitalWrite(RELAY_PIN, RELAY_STATE_ON);
    console.log("Relay is now on");
  }

  function relayOff() {
    digitalWrite(RELAY_PIN, RELAY_STATE_OFF);
    console.log("Relay is now off");
  }

  function pushRelay() {
    relayOn();
    setTimeout(() => relayOff(), RELAY_PUSH_TIME);
  }


  console.log("Init Display");
  I2C1.setup({ scl: D15, sda: D4 });
  var g = require("SSD1306").connect(I2C1, start, { rst: D16 });

  function setDisplayText(str){
    g.drawString(str, 2, 2);
    g.flip();
  }

  console.log("Init Relay");
  pinMode(RELAY_PIN, "output");
  console.log('Relay ' + RELAY_PIN + ' mode is set to "output"');
  relayOff();

  console.log("Init WiFi");
  console.log('Connecting to ' + WIFI_SSID + "...");
  setDisplayText('Connecting to ' + WIFI_SSID + "...");

  wifi.connect(WIFI_SSID, { password: WIFI_PASSWORD }, function(err) {

    if (err) {
      console.log("Error while connecting to WiFi", err);
      return;
    }

    var ipAdress =  wifi.getIP().ip;

    console.log("connected.");
    setDisplayText("connected.");

    console.log("Init Server");
    http.createServer(function(req, res) {
      if (req.method === "GET" && req.url === "/push") {

        console.log("200 " + req.url);

        pushRelay();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ success: true }));

      } else {

        console.log("404 " + req.url);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');

      }
    }).listen(SERVER_PORT);

    console.log("Push ready at http://" + ipAdress + ":" + SERVER_PORT + "/push");
    setDisplayText("Push ready at http://" + ipAdress + ":" + SERVER_PORT + "/push");


  });

}