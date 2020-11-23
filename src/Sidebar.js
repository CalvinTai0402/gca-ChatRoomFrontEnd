import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MessageIcon from "@material-ui/icons/Message";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";

function Sidebar({ chatrooms }) {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar fontSize="large" src={user?.photoURL}></Avatar>
        <div className="sidebar_headerRight">
          <IconButton>
            <RadioButtonUncheckedIcon
              htmlColor="white"
              fontSize="large"
            ></RadioButtonUncheckedIcon>
          </IconButton>
          <IconButton>
            <MessageIcon htmlColor="white" fontSize="large"></MessageIcon>
          </IconButton>
          <IconButton>
            <MoreHorizIcon htmlColor="white" fontSize="large"></MoreHorizIcon>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon></SearchIcon>
          <input placeholder="Search chat" type="text"></input>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat name={"Create New Room"}></SidebarChat>
        {chatrooms.map((chatroom) => {
          return (
            <SidebarChat
              key={chatroom._id}
              id={chatroom._id}
              name={chatroom.roomName}
            ></SidebarChat>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
