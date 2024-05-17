function replaceURL(url) {
    return url.replace(/https:\/\/x\.com/g, "https://fxtwitter.com");
  }
  
  let lastClipboardText = "";
  let isMonitoring = false;
  let clipboardInterval = null;
  
  function checkClipboard() {
    navigator.clipboard.readText().then((text) => {
      if (text !== lastClipboardText) {
        const replacedText = replaceURL(text);
        if (replacedText !== text) {
          navigator.clipboard.writeText(replacedText).then(() => {
            console.log("URL replaced in clipboard:", replacedText);
            lastClipboardText = replacedText;
          });
        } else {
          lastClipboardText = text;
        }
      }
    }).catch((err) => {
      console.error("Failed to read clipboard contents: ", err);
    });
  }
  
  function startClipboardMonitoring() {
    if (!clipboardInterval) {
      clipboardInterval = setInterval(checkClipboard, 1000); // Check the clipboard every second
    }
  }
  
  function stopClipboardMonitoring() {
    if (clipboardInterval) {
      clearInterval(clipboardInterval);
      clipboardInterval = null;
    }
  }
  
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setMonitoring") {
      isMonitoring = message.enabled;
      if (isMonitoring) {
        startClipboardMonitoring();
      } else {
        stopClipboardMonitoring();
      }
      browser.storage.local.set({ monitoringEnabled: isMonitoring });
      sendResponse({ success: true });
    }
  });
  
  // Restore the monitoring state when the extension is loaded
  browser.storage.local.get("monitoringEnabled").then((result) => {
    isMonitoring = result.monitoringEnabled || false;
    if (isMonitoring) {
      startClipboardMonitoring();
    }
  });
  