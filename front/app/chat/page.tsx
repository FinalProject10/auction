"use client";

// import { ChatEngine } from "react-chat-engine";
import { PrettyChatWindow } from "react-chat-engine-pretty";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <button style={{ position: "absolute", top: "0px", left: "0px" }}>
        Sign Out
      </button>
      <PrettyChatWindow
        projectId={process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID || ""}
        username="salmenkh1999@gmail.com"
        secret="salmenkhelifi"
        style={{ height: "100%" }}
      />
    </div>
  );
}

export default App;
