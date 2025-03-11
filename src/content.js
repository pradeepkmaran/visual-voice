(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");

  const translateCaptions = async (captions) => {
    try {
      const apiUrl = "https://youtube-caption-api.vercel.app/translate?lang=tamil";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ captions })
      });

      if (!response.ok) {
        console.error(`Translation API error: ${response.status}`);
        return captions.map(caption => caption.text);
      }

      const data = await response.json();
      return data.translatedCaptions || captions.map(caption => caption.text);
    } catch (error) {
      console.error("Error during translation:", error);
      return captions.map(caption => caption.text);
    }
  };

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

        // Send entire captions array for translation
        const translatedTexts = await translateCaptions(captions); 

        captions.forEach((caption, index) => {
          let { offset, duration, speechRate } = caption;
          let text = translatedTexts[index] || caption.text;

          text = text.replace(/&amp;#39;/g, "'").replace(/\[Music\]/g, "");

          if (index < 10) console.log(text);

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