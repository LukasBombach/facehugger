


function onInit() {

  var wifi = require("Wifi");
  var http = require("http");

  var ssid = "Hyperspace Gate Project";
  var password = "wlanpasswort";
  var serverPort = 3001;

  console.log('Connecting to WiFi ' + ssid);

  wifi.connect(ssid, { password: password }, function(err) {
    if (err) {
      console.log("Error while connecting to WiFi", err);
    } else {

      var ipAdress =  wifi.getIP().ip;

      console.log("connected.");

      http.createServer(function(req, res) {
        if (req.method === "GET" && req.url === "/push") {

          console.log("200 " + req.url);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ success: true }));

        } else {

          console.log("404 " + req.url);
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('404 Not Found');

        }
      }).listen(serverPort);

      console.log("Push ready at http://" + ipAdress + ":" + serverPort + "/push");

    }
  });

}