chrome.action.onClicked.addListener(async (tab) => {
    try {
      if (tab.url && tab.url.includes("youtube.com/watch")) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => alert("This extension works only on YouTube video pages.")
        });
      }
    } catch (error) {
      console.error("Error during script execution:", error);
    }
  });
  