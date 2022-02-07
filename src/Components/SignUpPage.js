import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function SignUpPage() {
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
      localStorage.setItem("token", data.jwt);
      window.location.reload();
    } else {
      console.log(data);
      setErrors(data.errors);
    }
  }

  return (
    <div className="">
      <div className="d-flex p-2 justify-content-center">
        <p>Sign up:</p>
      </div>
      <div className={"d-flex p-2 justify-content-center"}>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
          <br />
          <input
            className="form-control"
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <br />
          <button className={"btn btn-primary mx-auto d-block"} type="submit">
            Register
          </button>
        </form>
      </div>
      <div>
        <p className=" text-center text-info">
          Email system currently being tested. <br /> By signing up you agree to
          potentially receive spam emails from me.
        </p>
      </div>
      <div className="d-flex flex-column p-2 justify-content-center text-center">
        <p className="text-danger">{errors}</p>
        <p>
          Already have an account? <Link to="/">Log in.</Link>
        </p>
      </div>
    </div>
  );
}
