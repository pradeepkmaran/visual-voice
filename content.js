(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");

  if (videoId) {
    console.log(`Video ID: ${videoId}`);
    
    const apiUrl = `https://youtube-caption-api.vercel.app/caption/${videoId}`;
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        alert(`Failed to fetch captions. Status: ${response.status}`);
        return;
      }

      const captions = await response.json();

      if (captions.length > 0) {
        const now = Date.now();
        
        captions.forEach((caption) => {
          let { text, offset, duration, speechRate } = caption;

          text = text.replace(/&amp;#39;/g, "'");
          text = text.replace(/\[Music\]/g, "");
          
          const rate = Math.min(300, Math.max(100, speechRate));
          const startTime = now + offset * 1000;
          
          setTimeout(() => {
            chrome.runtime.sendMessage({
              type: "speak",
              text: text,
              rate: rate
            });
          }, startTime - Date.now());
        });
        
        console.log("Captions scheduled for speech.");
      } else {
        alert("No captions found for this video.");
      }
    } catch (error) {
      console.error("Error fetching captions:", error);
      alert("An error occurred while fetching captions.");
    }
  } else {
    alert("No video ID found on this page.");
    console.error("No video ID found on this page.");
  }
})();
