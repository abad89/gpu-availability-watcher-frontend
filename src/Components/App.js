import { useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  function handleChangeUser(user) {
    if (currentUser) {
      handleLogIn();
    }
    setCurrentUser(user);
    console.log("handleChangeUser", currentUser);
  }

  function handleLogIn() {
    setLoggedIn((loggedIn) => !loggedIn);
  }

  return (
    <div className="App">
      Hello App.js!
      <Switch>
        <Route exact path="/dashboard">
          Dashboard.
        </Route>
        <Route exact path="/">
          {loggedIn ? <LoginPage onChangeUser={handleChangeUser} /> : <Redirect to="/dashboard" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
