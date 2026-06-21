const ytdlp = require("yt-dlp-exec");
const path = require("path");

async function downloadAudio(videoUrl) {
  const outputPath = path.join(
    __dirname,
    "downloads",
    `${Date.now()}.mp3`
  );

  await ytdlp(videoUrl, {
    extractAudio: true,
    audioFormat: "mp3",
    output: outputPath,
    noWarnings: true,

    ffmpegLocation:
      "C:\\Users\\ghane\\Downloads\\ffmeg\\ffmpeg-8.1.1-essentials_build\\bin",
  });

  return outputPath;
}

module.exports = downloadAudio;