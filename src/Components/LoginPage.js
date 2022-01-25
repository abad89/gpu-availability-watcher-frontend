import { useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function LoginPage({ onChangeUser }) {
  const [errors, setErrors] = useState([]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: formData.email,
      password: formData.password,
    };
    const response = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.jwt)
      window.location.reload()
    } else {
      console.log(data)
      setErrors(data.errors);
    }
  }

  return (
    <div className="w-50 mx-auto">
      <p>{errors}</p>
      <p>Login:</p>
      <div className={"col-md-8 offset-md-2 p-2"}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <input className={""} type="submit" value="Add User"></input>
        </form>
      </div>
    </div>
  );
}
