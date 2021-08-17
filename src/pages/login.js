import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/homepage");
    }
  }, []);
  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();

    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/homepage");
  }

  return (
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-pic js-tilt" data-tilt>
            <img src="assets/img-01.png" alt="IMG" />
            <form class="login100-form validate-form">
              <span class="login100-form-title">Login</span>

              <div class="wrap-input100 validate-input">
                <input
                  class="input100"
                  type="text"
                  name="usermail"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input
                  class="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div class="container-login100-form-btn">
                <button class="login100-form-btn" type="submit" onClick={login}>
                  Login
                </button>
              </div>

              <div class="text-center p-t-12">
                <span class="txt1">Forgot</span>
                <a class="txt2" href="">
                  Username / Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
