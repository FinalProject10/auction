// import { PrettyChatWindow } from "react-chat-engine-pretty";

export default function Page() {
  return (
    <div style={{ height: "100vh" }}>
      <button style={{ position: "absolute", top: "0px", left: "0px" }}>
        Sign Out
      </button>
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Chat feature is currently unavailable. Please install react-chat-engine-pretty to enable.</p>
      </div>
      {/* <PrettyChatWindow
        projectId={process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID || ""}
        username="khelifisalmen9@gmail.com"
        secret="salmenkhelifi"
        style={{ height: "100%" }}
      /> */}
    </div>
  );
}
