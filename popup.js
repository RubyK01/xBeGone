function updateButtonState(enabled) {
    const button = document.getElementById("toggle-button");
    if (enabled) {
      button.textContent = "Disable Clipboard Monitoring";
      button.classList.remove("disabled");
    } else {
      button.textContent = "Enable Clipboard Monitoring";
      button.classList.add("disabled");
    }
  }
  
  document.getElementById("toggle-button").addEventListener("click", () => {
    browser.storage.local.get("monitoringEnabled").then((result) => {
      const newState = !result.monitoringEnabled;
      browser.runtime.sendMessage({ action: "setMonitoring", enabled: newState }, (response) => {
        if (response.success) {
          updateButtonState(newState);
        }
      });
    });
  });
  
  // Initialize the button state when the popup is opened
  browser.storage.local.get("monitoringEnabled").then((result) => {
    const isEnabled = result.monitoringEnabled || false;
    updateButtonState(isEnabled);
  });
  