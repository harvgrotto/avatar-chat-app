
import { useState, useEffect, useRef } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const recognition = useRef();
  const [didReady, setDidReady] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.onresult = e => setMsg(e.results[0][0].transcript);
    recognition.current.lang = "en-US";

    // Check if D-ID is loaded
    const checkDID = setInterval(() => {
      if (window.DID) {
        setDidReady(true);
        clearInterval(checkDID);
      }
    }, 100);
  }, []);

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
      <div id="avatar" style={{ width: "400px", height: "400px", background: "#eee" }}></div>
      <button onClick={() => recognition.current.start()}>🎙️ Talk</button>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
