(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");

  if (videoId) {
    alert(`Video ID: ${videoId}`);
    console.log(`Video ID: ${videoId}`);
  } else {
    alert("No video ID found on this page.");
    console.error("No video ID found on this page.");
  }
})();
