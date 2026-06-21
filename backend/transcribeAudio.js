const fs = require("fs");

async function transcribeAudio(audioPath) {
  const audioBuffer = fs.readFileSync(audioPath);

  const response = await fetch(
    "https://api.deepgram.com/v1/listen",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": "audio/mp3",
      },
      body: audioBuffer,
    }
  );

  const data = await response.json();

  const alternative =
    data.results.channels[0].alternatives[0];

  return {
    transcript: alternative.transcript,
    words: alternative.words,
  };
}

module.exports = transcribeAudio;