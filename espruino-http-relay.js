


function onInit() {

  var wifi = require("Wifi");
  var http = require("http");

  var ssid = "Hyperspace Gate Project";
  var password = "wlanpasswort";
  var serverPort = 3001;

  var RELAY_PIN = D5;
  var RELAY_STATE_ON = 0;  // yes, ON is zero 
  var RELAY_STATE_OFF = 1; // yes, OFF is one
  var RELAY_PUSH_TIME = 500;

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


  pinMode(RELAY_PIN, "output");
  console.log('Relay ' + RELAY_PIN + ' mode is set to "output"');
  relayOff();

  console.log('Connecting to ' + ssid + "...");

  wifi.connect(ssid, { password: password }, function(err) {

    if (err) {
      console.log("Error while connecting to WiFi", err);
      return;
    }

    var ipAdress =  wifi.getIP().ip;

    console.log("connected.");

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
    }).listen(serverPort);

    console.log("Push ready at http://" + ipAdress + ":" + serverPort + "/push");


  });

}