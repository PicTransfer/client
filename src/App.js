import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spaces from "./pages/Spaces";
import socket from "./services/socketService";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const markAsRead = (index) => {
    setNotifications((prevNotifications) => {
      const newNotifications = [...prevNotifications];
      newNotifications.splice(index, 1);
      return newNotifications;
    });
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/spaces">
            {token ? <Spaces token={token} /> : <Redirect to="/login" />}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification.message}
              <button onClick={() => markAsRead(index)}>Mark as read</button>
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
