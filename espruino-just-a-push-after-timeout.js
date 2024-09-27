const RELAY_PIN = D5;
const RELAY_VALUE_ON = 0; // yes, ON is zero
const RELAY_VALUE_OFF = 1; // yes, OFF is one
const START_PUSH_DELAY = 1000;
const RELAY_PUSH_TIME = 500;

function onInit() {
  setupRelay();
  console.log("waiting " + RELAY_PUSH_TIME + "ms before pushing relay");
  setTimeout(() => {
    pushRelay(RELAY_PUSH_TIME);
    console.log("done");
  }, START_PUSH_DELAY);
}

function setupRelay() {
  pinMode(RELAY_PIN, "output");
  setRelay(false);
}

function setRelay(state) {
  const value = state ? RELAY_VALUE_ON : RELAY_VALUE_OFF;
  digitalWrite(RELAY_PIN, value);
  console.log("Relay ", state ? "on" : "off");
}

function pushRelay(ms) {
  setRelay(true);
  setTimeout(() => setRelay(false), ms);
}
