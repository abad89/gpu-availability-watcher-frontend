import { useState, useEffect } from "react";
import UserButtons from "./UserButtons";
import LoadingSpinner from "./LoadingSpinner";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function LoginPage({ onChangeUser }) {
  const [errors, setErrors] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/users")
      .then((r) => r.json())
      .then(setUserList);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddUser(userToAdd) {
    const updatedUserList = [...userList, userToAdd];
    setUserList(updatedUserList);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: formData.email,
      password: formData.password,
    };
    const response = await fetch(BASE_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data)
      handleAddUser(data.user);
      localStorage.setItem("token", data.jwt)
    } else {
      console.log(data)
      setErrors(data.errors);
    }
  }

  function handleDeleteUser(userToDelete) {
    const updatedUserList = userList.filter(
      (user) => user.id !== userToDelete.id
    );
    setUserList(updatedUserList);
  }

  const usersItem = userList.map((user) => (
    <UserButtons
      onChangeUser={onChangeUser}
      onDeleteUser={handleDeleteUser}
      key={user.id}
      email={user.email}
      id={user.id}
      user={user}
    />
  ));

  return (
    <div className="w-50 mx-auto">
      <p>{errors}</p>
      <p>Sign up:</p>
      <div className={"col-md-8 offset-md-2 p-2"}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
          <input
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <input className={""} type="submit" value="Add User"></input>
        </form>
      </div>
      {userList.length ? null : <LoadingSpinner />}
      {usersItem}
    </div>
  );
}
