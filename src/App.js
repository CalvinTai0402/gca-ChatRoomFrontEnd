import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "./axios.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  // const [messages, setMessages] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  // useEffect(() => {
  //   async function syncMessages() {
  //     const req = await axios.get("/messages/sync");
  //     setMessages(req.data);
  //   }
  //   syncMessages();
  // }, []);
  useEffect(() => {
    async function syncChatrooms() {
      const req = await axios.get("/chatrooms/sync");
      setChatrooms(req.data);
    }
    syncChatrooms();
  }, []);
  // useEffect(() => {
  //   var pusher = new Pusher("8f4e5dd658fe39a33078", {
  //     cluster: "us3",
  //   });

  //   var channel = pusher.subscribe("messages-channel");
  //   channel.bind("inserted", function (data) {
  //     setMessages([...messages, data]);
  //   });
  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages]);

  useEffect(() => {
    var pusher = new Pusher("447ee2882340be598b06", {
      cluster: "us3",
    });

    var channel = pusher.subscribe("chatrooms-channel");
    channel.bind("inserted", function (data) {
      setChatrooms([...chatrooms, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatrooms]);

  return (
    <div className="app">
      <div className="app_header"></div>
      {user ? (
        <div className="app_body">
          <Router>
            <Sidebar chatrooms={chatrooms}></Sidebar>
            <Switch>
              <Route exact path="/">
                {/* <Chat messages={messages}></Chat> */}
                <Chat></Chat>
              </Route>
              <Route path="/rooms/:roomId">
                {/* <Chat messages={messages}></Chat> */}
                <Chat></Chat>
              </Route>
            </Switch>
          </Router>
        </div>
      ) : (
        <h1>
          <Login></Login>
        </h1>
      )}
    </div>
  );
}

export default App;
