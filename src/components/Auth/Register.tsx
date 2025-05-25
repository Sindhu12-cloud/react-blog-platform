// src/components/Auth/Register.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Register: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    const success = auth.register(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("User already exists.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account 📝</h2>
        <p style={styles.subheading}>Register to start sharing your blogs</p>
        <form onSubmit={handleRegister} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <div style={styles.footer}>
          <p>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f9ff",
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
    backgroundColor: "#28a745",
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
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Register;
