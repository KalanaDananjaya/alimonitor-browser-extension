// console.log('Hello, world!'); 
// // window.setInterval(function() {
// //     console.log('Hello, world!'); 
// //   }, 1);


// browser.runtime.onInstalled.addListener(() => {
//   console.log('onInstalled...');
//   // create alarm after extension is installed / upgraded
//   browser.alarms.create('refresh', { periodInMinutes: 0.1 });
// });

// browser.alarms.onAlarm.addListener((alarm) => {
//   console.log(alarm.name); // refresh
//   helloWorld();
// });

// function helloWorld() {
  
//   response = httpGet("http://alimonitor.cern.ch/plugin/pluginData.jsp")
//   console.log("response", response);
// }

// function httpGet(url)
// {
//     // var xmlHttp = new XMLHttpRequest();
//     // xmlHttp.open( "GET", url, false ); // false for synchronous request
//     // console.log("sending")
//     // xmlHttp.send( null );
//     // console.log("resp",xmlHttp.responseText)
//     // return xmlHttp.responseText;
//     window.fetch(url).then(function(response) {
//       return response.json();
//     }).then(function(data) {
//       console.log(data);
//     }).catch(function() {
//       console.log("Booo");
//     });
    
// }