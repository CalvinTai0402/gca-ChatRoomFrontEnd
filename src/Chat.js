import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useState, useRef, useEffect } from "react";
import axios from "./axios";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { v4 as uuidv4 } from "uuid";

function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const scrollToBottom = () => {
    const scrollDiv = document.getElementById("scroll_bottom");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  };

  const fetchRoom = async () => {
    await axios.get(`/chatrooms/sync/${roomId}`).then((room) => {
      setIsLoading(true);
      setRoomName(room.data.roomName);
      setIsLoading(false);
    });
  };

  const fetchRoomMessages = async () => {
    await axios.get(`/chatrooms/sync/${roomId}/messages`).then((data) => {
      setRoomMessages(data.data);
    });
  };

  useEffect(() => {
    if (roomMessages !== undefined && roomMessages.length !== 0) {
      scrollToBottom();
    }
  }, [roomId, roomMessages]);

  useEffect(() => {
    fetchRoom();
    fetchRoomMessages();
  }, [roomId]);

  // useEffect(() => {
  //   fetchRoomMessages();
  // }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const hours = date.getHours();
    var mins = date.getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }
    await axios.post(`/chatrooms/sync/${roomId}/messages`, {
      name: user.displayName.split(" ")[0],
      message: input,
      timeStamp: hours + ":" + mins,
    });
    fetchRoomMessages();
    setInput("");
  };

  if (isLoading) {
    return (
      <div className="chat">
        <div className="chat_header">
          {roomName ? (
            <div className="chat_headerInfo">
              <h1>{roomName}</h1>
              <p>
                last message at{" "}
                {roomMessages[roomMessages.length - 1]?.timeStamp}
              </p>
            </div>
          ) : (
            <h1></h1>
          )}
          {/* <Avatar></Avatar> */}

          <div className="chat_headerRight">
            <IconButton>
              <SearchIcon htmlColor="white" fontSize="large"></SearchIcon>
            </IconButton>
            <IconButton>
              <MoreVertIcon htmlColor="white" fontSize="large"></MoreVertIcon>
            </IconButton>
          </div>
        </div>

        {/* <div id="scroll_bottom" className="chat_body"></div> */}

        <div className="chat_footer">
          <div className="chat_footerLeft">
            <IconButton>
              <EmojiEmotionsIcon
                htmlColor="white"
                fontSize="large"
              ></EmojiEmotionsIcon>
            </IconButton>
            <IconButton>
              <AttachFileIcon
                htmlColor="white"
                fontSize="large"
              ></AttachFileIcon>
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

  return (
    <div className="chat">
      <div className="chat_header">
        {roomName ? (
          <div className="chat_headerInfo">
            <h1>{roomName}</h1>
            <p>
              last message at {roomMessages[roomMessages.length - 1]?.timeStamp}
            </p>
          </div>
        ) : (
          <h1></h1>
        )}
        {/* <Avatar></Avatar> */}

        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon htmlColor="white" fontSize="large"></SearchIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon htmlColor="white" fontSize="large"></MoreVertIcon>
          </IconButton>
        </div>
      </div>

      <div id="scroll_bottom" className="chat_body">
        {roomMessages.map((message) => (
          <p
            key={uuidv4()}
            className={`chat_message ${
              message.name === user.displayName.split(" ")[0] && "chat_receiver"
            }`}
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
