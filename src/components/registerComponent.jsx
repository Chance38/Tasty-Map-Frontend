import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password: password })
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }
      alert("Register success! You can now login.");
      navigate("/login");
    } catch (error) {
      alert("Register failed: " + error.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px", maxWidth: "400px" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
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
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
