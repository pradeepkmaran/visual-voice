chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "speak") {
    chrome.tts.speak(message.text, {
      rate: message.rate / 100,  
      pitch: 1,                  
      volume: 1,           
      lang: 'ta-IN',
      enqueue: true,      
      onEvent: (event) => {
        if (event === "error") {
          console.error("Error occurred during speech synthesis.");
        }
      }
    });
  }
});
