import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spaces from "./pages/Spaces";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

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
      </div>
    </Router>
  );
}

export default App;
