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
        
        // Loop through captions and schedule TTS based on offset and duration
        captions.forEach((caption) => {
          const { text, offset, duration, speechRate } = caption;
          
          const rate = Math.min(300, Math.max(100, speechRate));  // Adjust rate between 100 and 300 for comfort
          const startTime = now + offset * 1000;  // Offset in seconds, convert to milliseconds
          
          // Schedule the TTS to start at the right time (with offset)
          setTimeout(() => {
            // Send message to background to start speech synthesis
            chrome.runtime.sendMessage({
              type: "speak",
              text: text,
              rate: rate
            });
          }, startTime - Date.now());  // Adjust delay based on current time and offset
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
