import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';

export const HeaderComponent = () => {
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let username = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub;
    } catch (error) {
      console.error("Token decode failed:", error);
    }
  }

  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Tasty Map</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">Home</Link>
              </li>
            </ul>
            {!token && (
              <div className="d-flex align-items-center">
                <button className="btn btn-outline-light" onClick={handleLogin}>Login</button>
              </div>
            )}
            {token && (
              <div className="d-flex align-items-center">
                <span className="text-white me-3">hi, {username}</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>Log out</button>
              </div>
            )}
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;