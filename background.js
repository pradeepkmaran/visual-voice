// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "speak") {
    // Use chrome.tts to speak the text passed in the message
    chrome.tts.speak(message.text, {
      rate: message.rate / 200,  // Adjust rate (between 0.1 and 2)
      pitch: 1,                  // Standard pitch
      volume: 1,                 // Full volume
      onEvent: (event) => {
        if (event === "error") {
          console.error("Error occurred during speech synthesis.");
        }
      }
    });
  }
});
