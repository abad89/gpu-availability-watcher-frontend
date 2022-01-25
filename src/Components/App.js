// brave-williams-87bf8a.netlify.app

import { useState, useEffect } from "react"
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import DashboardPage from "./DashboardPage";
import SignUpPage from "./SignUpPage";
import GPUsPage from "./GPUsPage"
import LoginPage from "./LoginPage";

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
        setCurrentUser(data)
        handleChangeUser(data);
      })
    }
  }, [])

  function handleChangeUser(user) {
    handleLogIn();
    // setCurrentUser(user);
    // console.log("handleChangeUser l.38", currentUser)
  }

  function handleLogIn() {
    setLoggedIn((loggedIn) => !loggedIn);
  }

  function handleLogOut() {
    history.push("/")
    handleLogIn()
    setCurrentUser(null)
    localStorage.removeItem("token")
  }

  // console.log(currentUser)

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
          {loggedIn ? <Redirect to="/dashboard" user={currentUser} /> : <SignUpPage onChangeUser={handleChangeUser} />}
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
