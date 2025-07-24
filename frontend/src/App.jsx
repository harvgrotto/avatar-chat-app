import { useState, useEffect, useRef } from "react";
import { Viewer } from "@d-id/viewer"; // ✅ Add this import

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const recognition = useRef();

  const speak = (text) => {
    if (window.DID && window.DID.renderPlayer) {
      window.DID.renderPlayer({
        script: { type: "text", input: text },
        config: {
          avatar: {
            type: "avatar",
            id: process.env.REACT_APP_DID_AVATAR_ID || "your-avatar-id"
          },
          fluent: true,
          align: "center",
          scale: 1,
          autoplay: true,
        },
        container: document.getElementById("avatar"),
      });
    } else {
      console.error("----> D-ID SDK not loaded or renderPlayer unavailable");
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.onresult = e => setMsg(e.results[0][0].transcript);
    recognition.current.lang = "en-US";
  }, []);

  const handleSend = async () => {
    const res = await fetch("https://avatar-chat-app.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    setReply(data.reply);
    speak(data.reply);
  };

  return (
    <div>
      {/* ✅ Replace the div with the Viewer */}
      <Viewer
        id="avatar"
        style={{ width: "400px", height: "400px", background: "#eee" }}
      />

      <button onClick={() => recognition.current.start()}>🎙️ Talk</button>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
