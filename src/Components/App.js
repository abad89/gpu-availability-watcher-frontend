// brave-williams-87bf8a.netlify.app

import { useState, useEffect } from "react"
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import GPUsPage from "./GPUsPage"

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(BASE_URL + '/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then (r => r.json())
      .then (data => {
        // console.log(data)
        handleChangeUser(data)
      })
    }
  }, [])

  function handleChangeUser(user) {
    // handleLogIn();
    var testVar = "yes"
    setCurrentUser(user);
    whoIsCurrentUser()
    console.log("handleChangeUser l.38", currentUser)
    console.log(testVar)
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

  function whoIsCurrentUser() {
    console.log(currentUser)
  }

  console.log(currentUser)

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/gpus">
          <GPUsPage user={currentUser} loggedIn={loggedIn} />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage loggedIn={loggedIn} user={currentUser} onLogOut={handleLogOut} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" user={currentUser} /> : <LoginPage onChangeUser={handleChangeUser} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
