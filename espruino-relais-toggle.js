const RELAY_STATE_ON = 0; // yes, ON is zero
const RELAY_STATE_OFF = 1; // yes, OFF is one

var relayPin = D5; // Angenommen, das Relais ist an Pin D5 angeschlossen

function setup() {
  pinMode(relayPin, "output");
  console.log("Relais-Steuerung bereit");
  turnOff(); // Relais initial ausschalten
  setInterval(() => toggleRelay(), 3000); // Relais alle 3000ms umschalten
}

function turnOn() {
  digitalWrite(relayPin, RELAY_VALUE_ON);
  console.log("Relais ist jetzt AN");
}

function turnOff() {
  digitalWrite(relayPin, RELAY_VALUE_OFF);
  console.log("Relais ist jetzt AUS");
}

function toggleRelay() {
  var currentState = digitalRead(relayPin);
  digitalWrite(relayPin, !currentState);
  console.log("Relais ist jetzt " + (currentState ? "AN" : "AUS"));
}

// Setup ausführen
setup();
