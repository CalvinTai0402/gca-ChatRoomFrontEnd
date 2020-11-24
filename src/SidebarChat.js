import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import axios from "./axios";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function SidebarChat({ id, addNewChat, name }) {
  const history = useHistory();
  const [lastMessage, setLastMessage] = useState("");
  const [{ updateLastMessage }, dispatch] = useStateValue();
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
  useEffect(async () => {
    if (id) {
      await axios.get(`chatrooms/sync/${id}/messages`).then((data) => {
        const messages = data.data;
        var lastMsg = "";
        if (messages.length >= 1) {
          lastMsg = messages[messages.length - 1].message;
        }
        if (lastMsg.length > 20) {
          lastMsg = lastMsg.substring(0, 50);
        }
        console.log(lastMsg);
        setLastMessage(lastMsg);
        dispatch({
          type: actionTypes.UPDATE_LAST_MESSAGE,
          updateLastMessage: false,
        });
      });
    }
  }, [updateLastMessage]);
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        {/* <Avatar></Avatar> */}
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <div>Last Message: {lastMessage}</div>
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
