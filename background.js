function replaceURL(url) {
    return url.replace(/https:\/\/x\.com/g, "https://fxtwitter.com");
  }
  
  let lastClipboardText = "";
  
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
  
  function loopClipboard() {
    setInterval(checkClipboard, 1000); // Check the clipboard every second
  }
  
  loopClipboard();
  