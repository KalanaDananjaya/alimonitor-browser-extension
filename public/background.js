let portFromCS;
let url;

function connected(p) {
  portFromCS = p;
  portFromCS.onMessage.addListener((message) => {
    console.log(message.url)
    url = message.url
    if (message.getData) {
      httpGet(url)
    }
  });
}

browser.runtime.onConnect.addListener(connected);

browser.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  browser.tabs.create({ url: "empty.html" }).then(() => {
    browser.tabs.executeScript({
      code: `alert("Please ensure you have an ALICE Grid Certificate installed on your browser to ensure proper functionality"); window.close();`
    });
  });
  // create alarm after extension is installed / upgraded
  browser.alarms.create('refresh', { periodInMinutes: 0.1 });
});

browser.alarms.onAlarm.addListener(() => {
  if (url !== undefined) {
    httpGet();
  }
});

function httpGet() {
  window.fetch(url).then(function (response) {
    return response.json();
  }).then((result) => {
    checkAlerts(result)
    portFromCS.postMessage({ result });
  }).catch((error) => {
    if (error instanceof TypeError) {
      console.error("Please add certificate:", error);
    }
    else {
      console.log("No receiver port available")
    }
  });
}

const changeIcon = (color) => {
  browser.browserAction.setIcon({
    path: "./images/alert-" + color + ".png"
  })
}

function checkAlerts(data) {
  let alertCount = data.csIssues.length + data.siteIssues.length
  if (alertCount > 0) {
    changeIcon("red");
  } else {
    changeIcon("green");
  }
}
