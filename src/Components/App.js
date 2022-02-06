// brave-williams-87bf8a.netlify.app

import { useState, useEffect } from "react"
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import MyGPUsContainer from "./MyGPUsContainer";
import SignUpPage from "./SignUpPage";
import GPUDatabaseContainer from "./GPUDatabaseContainer"
import LoginPage from "./LoginPage";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [myGpuList, setMyGpuList] = useState([]);
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
  
console.log("prior to useEffect", myGpuList)

  useEffect(() => {
    if (currentUser != null && myGpuList.length === 0) {
      fetch(BASE_URL + `/users/${currentUser.id}/usergpus`)
        .then((r) => r.json())
        .then(setMyGpuList);
    }
  }, [currentUser]);

  console.log("after useEffect", myGpuList)

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
        {/* <Route exact path="/gpus">
          <GPUsPage user={currentUser} loggedIn={loggedIn} />
        </Route> */}
        <Route exact path="/dashboard">
          <MyGPUsContainer loggedIn={loggedIn} user={currentUser} onLogOut={handleLogOut} myGpuListProp={myGpuList} />
          <GPUDatabaseContainer loggedIn={loggedIn} user={currentUser} />
        </Route>
        <Route exact path="/register">
          {loggedIn ? <Redirect to="/dashboard" /> : <SignUpPage /> }
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" user={currentUser} /> : <LoginPage onChangeUser={handleChangeUser} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
