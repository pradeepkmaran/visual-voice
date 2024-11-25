chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.videoId) {
      document.getElementById("videoId").textContent = message.videoId;
    }
});
  