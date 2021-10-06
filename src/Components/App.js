import { useState } from "react"
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import GPUsPage from "./GPUsPage"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  function handleChangeUser(user) {
    if (currentUser) {
      handleLogIn();
    }
    setCurrentUser(user);
    // console.log("handleChangeUser", currentUser);
  }

  function handleLogIn() {
    setLoggedIn((loggedIn) => !loggedIn);
  }

  function handleLogOut() {
    history.push("/")
    handleLogIn()
    setCurrentUser(null)
    // console.log("logging out...")
  }

  return (
    <div className="App">
      Hello App.js!
      <Switch>
        <Route exact path="/gpus">
          <GPUsPage user={currentUser} />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage loggedIn={loggedIn} user={currentUser} onLogOut={handleLogOut} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <LoginPage onChangeUser={handleChangeUser} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
