let portFromCS;
let url;

function connected(p) {
  portFromCS = p;
  portFromCS.onMessage.addListener((message) => {
    console.log("In background script, received message from content script")
    url = message.url
    if (message.getData) {
      httpGet(url)
    }
  });
}

browser.runtime.onConnect.addListener(connected);

browser.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  browser.alarms.create('refresh', { periodInMinutes: 0.05 });
});

browser.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // refresh
  if (url !== undefined) {
    httpGet();
  }
});

function httpGet() {
  window.fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    portFromCS.postMessage({ data });
  }).catch(function () {
    console.log("Error, no reciever port");
  });
}