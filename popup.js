document.getElementById("replace-button").addEventListener("click", () => {
    browser.runtime.sendMessage({ action: "checkClipboard" });
  });
  