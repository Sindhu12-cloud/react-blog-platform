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
    <nav style={styles.navbar}>
      <div style={styles.logoArea}>
        <img
          src="data:image/jpeg;base64,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"
          alt="Blog Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>BlogSphere</h1>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {user ? (
          <>
            <Link to="/add-blog" style={styles.link}>Add Blog</Link>
            <span style={styles.userText}>Hi, {user.email}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#f4f6fa",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "#4a90e2",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "4px",
    transition: "background 0.2s ease",
  },
  userText: {
    fontSize: "14px",
    color: "#333",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
  },
};

export default Navbar;
