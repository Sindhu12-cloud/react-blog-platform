// src/pages/Home.tsx
import React, { useContext } from "react";
import BlogContext from "../context/BlogContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const blogCtx = useContext(BlogContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  if (!blogCtx) return null;
  const { blogs, deleteBlog } = blogCtx;
  const currentUser = authCtx?.currentUser;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📰 All Blogs</h2>

      {currentUser && (
        <div style={styles.actions}>
          <p style={styles.welcome}>Welcome, <strong>{currentUser.email}</strong></p>
          <div style={styles.buttonGroup}>
            <button onClick={() => authCtx?.logout()} style={styles.logoutButton}>Logout</button>
            <button onClick={() => navigate("/add-blog")} style={styles.addButton}>+ Add New Blog</button>
          </div>
        </div>
      )}

      {blogs.length === 0 ? (
        <p style={styles.emptyText}>😕 No blogs available. Be the first to write one!</p>
      ) : (
        <div style={styles.blogList}>
          {blogs.map(blog => (
            <div key={blog.id} style={styles.blogCard}>
              <h3 style={styles.blogTitle}>{blog.title}</h3>
              <p style={styles.blogContent}>{blog.content}</p>
              <small style={styles.blogDate}>
                Posted on: {new Date(blog.createdAt).toLocaleString()}
              </small>
              {currentUser?.id === blog.authorId && (
                <div style={styles.cardButtons}>
                  <button onClick={() => navigate(`/edit-blog/${blog.id}`)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => deleteBlog(blog.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    backgroundColor: "#f9fafc",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "1.5rem",
    color: "#333",
  },
  actions: {
    marginBottom: "2rem",
  },
  welcome: {
    fontSize: "16px",
    marginBottom: "0.5rem",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  blogList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  blogCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    borderLeft: "4px solid #4a90e2",
  },
  blogTitle: {
    margin: "0 0 10px 0",
    fontSize: "20px",
    color: "#333",
  },
  blogContent: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "10px",
  },
  blogDate: {
    fontSize: "12px",
    color: "#888",
  },
  cardButtons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  emptyText: {
    fontSize: "16px",
    color: "#666",
    fontStyle: "italic",
  },
};

export default Home;
