const ytdlp = require("yt-dlp-exec");

async function test() {
  try {
    const info = await ytdlp(
      "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      {
        dumpSingleJson: true,
        noWarnings: true,
      }
    );

    console.log("Title:", info.title);
  } catch (err) {
    console.error(err);
  }
}

test();