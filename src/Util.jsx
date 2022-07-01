export const changeIcon = (color) => {
    // browser.browserAction.setIcon({
    //   path: "./images/alert-" + color + ".png"
    // })
  }

// export const createTab = (url) => {
//     // If a tab is opened by the extension, keep reusing it
//     if (browserTabId != -1) {
//       browser.tabs.update(browserTabId, {url: url});
//     } else {
//       browser.tabs.create({url: url,active: true}).then((tab) => {
//         if (tab.id !== undefined) {
//           setBrowserTabId(tab.id)
//         }
//       });
//     }
//   }