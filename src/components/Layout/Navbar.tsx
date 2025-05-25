// src/components/Layout/Navbar.tsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const user = authCtx?.currentUser;

  const handleLogout = () => {
    authCtx?.logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/add-blog">Add Blog</Link>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
