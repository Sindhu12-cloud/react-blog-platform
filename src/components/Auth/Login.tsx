// src/components/Auth/Login.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    const success = auth.login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>
        <p style={styles.subheading}>Please login to your blog account</p>
        <form onSubmit={handleLogin} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <div style={styles.footer}>
          <p>
            Don't have an account? <a href="/register" style={styles.link}>Register</a>
          </p>
          <p>
            <a href="/forgot-password" style={styles.link}>Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// 🎨 Inline styles for simplicity (can move to CSS module or styled-components)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f7f9fc",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    marginBottom: "8px",
    fontSize: "24px",
    color: "#333",
  },
  subheading: {
    marginBottom: "24px",
    fontSize: "14px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  label: {
    marginBottom: "6px",
    display: "block",
    fontWeight: 500,
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "10px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#4a90e2",
    textDecoration: "none",
  },
};

export default Login;
