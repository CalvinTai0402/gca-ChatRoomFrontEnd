import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "./axios.js";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function syncMessages() {
      const req = await axios.get("/messages/sync");
      setMessages(req.data);
    }
    syncMessages();
  }, []);

  useEffect(() => {
    var pusher = new Pusher("8f4e5dd658fe39a33078", {
      cluster: "us3",
    });

    var channel = pusher.subscribe("messages-channel");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  return (
    <div className="app">
      <div className="app_header"></div>
      <div className="app_body">
        <Sidebar></Sidebar>
        <Chat messages={messages}></Chat>
      </div>
    </div>
  );
}

export default App;
