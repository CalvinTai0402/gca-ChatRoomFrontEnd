import React from "react";
import "./SidebarChat.css";
import axios from "./axios";
import { Link } from "react-router-dom";

function SidebarChat({ id, addNewChat, name }) {
  const createChat = async () => {
    const roomName = prompt("What shall be the name of this room?");
    if (roomName) {
      await axios.post("chatrooms/new", {
        roomName: roomName,
        messages: [],
      });
      alert("Room added!");
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        {/* <Avatar></Avatar> */}
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <div>Testing 123</div>
        </div>
      </div>
    </Link>
  ) : (
    <div
      onClick={() => {
        createChat();
      }}
      className="center"
    >
      <h3>Create new chatroom</h3>
    </div>
  );
}

export default SidebarChat;
