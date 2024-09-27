const RELAY_PIN = D5;
const RELAY_VALUE_ON = 0; // yes, ON is zero
const RELAY_VALUE_OFF = 1; // yes, OFF is one
const RELAY_PUSH_TIME_DAFAULT = 2000;
const START_PUSH_DELAY = 2000;

function onInit() {
  setupRelay();
  console.log("waiting 5s before pushing relay");
  setTimeout(() => {
    pushRelay();
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
  setTimeout(() => setRelay(false), ms || RELAY_PUSH_TIME_DAFAULT);
}
