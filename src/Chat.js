import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useState, useRef, useEffect } from "react";
import axios from "./axios";
import "./Chat.css";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (messages !== undefined && messages.length !== 0) {
      scrollToBottom();
    }
  }, [messages]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("messages/new", {
      name: "Calvin",
      message: input,
      timeStamp: "Demo timeStamp",
      received: true,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar></Avatar>
        <div className="chat_headerInfo">
          <h1>Room</h1>
          <p>Test</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon htmlColor="white" fontSize="large"></SearchIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon htmlColor="white" fontSize="large"></MoreVertIcon>
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            ref={messagesEndRef}
            key={message._id}
            className={`chat_message ${message.received && "chat_receiver"}`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timeStamp}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <div className="chat_footerLeft">
          <IconButton>
            <EmojiEmotionsIcon
              htmlColor="white"
              fontSize="large"
            ></EmojiEmotionsIcon>
          </IconButton>
          <IconButton>
            <AttachFileIcon htmlColor="white" fontSize="large"></AttachFileIcon>
          </IconButton>
        </div>
        <form>
          <input
            placeholder="Enter a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          ></input>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Send message
          </button>
        </form>

        <IconButton>
          <MicNoneIcon htmlColor="white" fontSize="large"></MicNoneIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
