import { useState, useEffect } from "react"
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import GPUsPage from "./GPUsPage"
const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [lastUpdated, setLastUpdated] = useState([])
  let history = useHistory();

  useEffect(() => {
    fetch(BASE_URL + `/updates`)
      .then((r) => r.json())
      .then(setLastUpdated);
  }, []);

  function handleChangeUser(user) {
    handleLogIn();
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
      <Switch>
        <Route exact path="/gpus">
          <GPUsPage user={currentUser} loggedIn={loggedIn} lastUpdated={lastUpdated} />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage loggedIn={loggedIn} user={currentUser} onLogOut={handleLogOut} lastUpdated={lastUpdated} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <LoginPage onChangeUser={handleChangeUser} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
