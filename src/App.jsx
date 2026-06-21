import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState("");

  const videoRef = useRef(null);

  const handleConvert = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: videoUrl,
          }),
        }
      );

      const data = await response.json();

      console.log("FULL RESPONSE:", data);
      console.log("VIDEO URL:", data.videoUrl);

      setText(data.text || "");
      setWords(data.words || []);
      setVideoFile(data.videoUrl || "");

      if (data.words && data.words.length > 0) {
        setCurrentWord(data.words[0].word);
      } else {
        setCurrentWord("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || words.length === 0) {
      return;
    }

    const currentTime =
      videoRef.current.currentTime;

    const activeWord = words.find(
      (word) =>
        currentTime >= word.start &&
        currentTime <= word.end
    );

    if (
      activeWord &&
      activeWord.word !== currentWord
    ) {
      setCurrentWord(
        activeWord.word
      );
    }
  };

  return (
    <div className="container">
      <h1>
        Indian Sign Language Translator
      </h1>

      <div className="top-section">
        <input
          id="youtube-url"
          name="youtube-url"
          type="text"
          placeholder="Paste YouTube URL"
          value={videoUrl}
          onChange={(e) =>
            setVideoUrl(e.target.value)
          }
        />

        <button onClick={handleConvert}>
          {loading
            ? "Converting..."
            : "Convert Video"}
        </button>
      </div>

      <div className="main-content">
        <div className="left-panel">
          {videoFile && (
            <div className="video-container">
              <video
                key={videoFile}
                ref={videoRef}
                controls
                onTimeUpdate={
                  handleTimeUpdate
                }
              >
                <source
                  src={videoFile}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
        </div>

        <div className="right-panel">
          <h2>Current Word</h2>

          <div className="current-word">
            {currentWord ||
              "Play Video"}
          </div>

          <div
            className="letters"
            key={currentWord}
          >
            {currentWord
              .toUpperCase()
              .split("")
              .filter((letter) =>
                /^[A-Z]$/.test(letter)
              )
              .map(
                (
                  letter,
                  index
                ) => (
                  <div
                    className="card"
                    key={`${currentWord}-${letter}-${index}`}
                  >
                    <img
                      key={`${currentWord}-${letter}`}
                      src={`/signs/${letter}.jpg`}
                      alt={letter}
                      onLoad={() =>
                        console.log(
                          "Loaded:",
                          letter
                        )
                      }
                      onError={() =>
                        console.log(
                          "Failed:",
                          letter
                        )
                      }
                    />

                    <p>{letter}</p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>

      <div className="transcript-box">
        <h2>Transcript</h2>

        <input
          id="transcript"
          name="transcript"
          type="text"
          value={text}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;