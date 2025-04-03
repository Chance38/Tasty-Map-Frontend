import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password: password })
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Login Success, Welcome!!!!");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed, Please try again");
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px", maxWidth: "400px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                cursor: "pointer"
              }}
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div style={{ marginTop: "10px" }}>
              <p>Don't have a account?</p>
              <Link to="/register" className="btn btn-success">Create Account</Link>
      </div>
    </div>
  );
};

export default LoginComponent;
