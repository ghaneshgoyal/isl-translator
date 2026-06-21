const ytdlp = require("yt-dlp-exec");
const path = require("path");

async function downloadVideo(videoUrl) {
  const fileName = `${Date.now()}.mp4`;

  const outputPath = path.join(
    __dirname,
    "downloads",
    fileName
  );

  await ytdlp(videoUrl, {
    format: "mp4",
    output: outputPath,
    noWarnings: true,
  });

  return {
    outputPath,
    fileName,
  };
}

module.exports = downloadVideo;