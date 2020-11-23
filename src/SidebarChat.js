import React from "react";
import "./SidebarChat.css";
import axios from "./axios";
import { Link, useHistory } from "react-router-dom";

function SidebarChat({ id, addNewChat, name }) {
  const history = useHistory();
  const createChat = async () => {
    const roomName = prompt("What shall be the name of this room?");
    if (roomName) {
      await axios.post("chatrooms/new", {
        roomName: roomName,
        messages: [],
      });
      var redirectLink = "";
      await axios.get("chatrooms/sync/").then((data) => {
        const rooms = data.data;
        redirectLink = "/rooms/" + rooms[rooms.length - 1]._id;
        history.push(redirectLink);
      });
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
