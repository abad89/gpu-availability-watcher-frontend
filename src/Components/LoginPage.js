import { useState, useEffect } from "react";
import UserButtons from "./UserButtons";

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
      handleAddUser(data);
    } else {
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
    <div>
      <p>
        Please select your email. Go ahead and click it twice until I figure out
        why it doesn't work the first time.
      </p>
      <p>{errors}</p>
      <div className={"p-1"}>
        <form onSubmit={handleSubmit}>
          <input
            className={""}
            placeholder="email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
          <input className={""} type="submit" value="Add User"></input>
        </form>
      </div>
      {usersItem}
    </div>
  );
}
