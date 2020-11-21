import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar></Avatar>
      <div className="sidebarChat_info">
        <h2>Room</h2>
        <div>Testing 123</div>
      </div>
    </div>
  );
}

export default SidebarChat;
