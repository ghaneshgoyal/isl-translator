require("dotenv").config();

const express = require("express");
const cors = require("cors");

const downloadAudio = require("./downloadAudio");
const downloadVideo = require("./downloadVideo");
const transcribeAudio = require("./transcribeAudio");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/downloads",
  express.static("downloads")
);

app.post("/convert", async (req, res) => {
  try {
    const { url } = req.body;

    console.log("Downloading video...");

    const videoData =
      await downloadVideo(url);

    console.log(
      "Video saved at:",
      videoData.outputPath
    );

    console.log("Downloading audio...");

    const audioPath =
      await downloadAudio(url);

    console.log(
      "Audio saved at:",
      audioPath
    );

    console.log("Transcribing...");

    const result =
      await transcribeAudio(audioPath);

    console.log(
      "Transcript:",
      result.transcript
    );

    res.json({
      text: result.transcript,
      words: result.words,
      videoUrl: `http://localhost:5000/downloads/${videoData.fileName}`,
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});