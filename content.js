function listenForCopyEvent() {
    document.addEventListener("copy", () => {
      browser.runtime.sendMessage({ action: "checkClipboard" });
    });
  }
  
  // Listen for changes to the address bar and check clipboard on change
  function monitorAddressBar() {
    const addressBar = document.querySelector("input.urlbar-input");
    if (addressBar) {
      addressBar.addEventListener("change", () => {
        browser.runtime.sendMessage({ action: "checkClipboard" });
      });
    }
  }
  
  // Execute the functions to set up the listeners
  listenForCopyEvent();
  monitorAddressBar();
  