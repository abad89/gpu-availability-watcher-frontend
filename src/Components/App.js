import { useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import GPUsPage from "./GPUsPage"

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
        <Route exact path="/gpus">
          <GPUsPage user={currentUser} />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage user={currentUser} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <LoginPage onChangeUser={handleChangeUser} /> : <Redirect to="/dashboard" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
