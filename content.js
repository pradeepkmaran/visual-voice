const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("v");

if (videoId) {
  console.log(`Video ID: ${videoId}`);
  chrome.runtime.sendMessage({ videoId });
} else {
  console.error("No video ID found on this page.");
}
