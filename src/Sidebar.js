import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MessageIcon from "@material-ui/icons/Message";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          fontSize="large"
          src="https://media-exp1.licdn.com/dms/image/C5603AQHooVH7_Zr8ig/profile-displayphoto-shrink_200_200/0?e=1611187200&v=beta&t=ilg7lJdcIT6yadxGARPKC4ZE55cEtpULBIazPXr4hFo"
        ></Avatar>
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
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
      </div>
    </div>
  );
}

export default Sidebar;
