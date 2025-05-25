// src/components/Blogs/AddEditBlog.tsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogContext from "../../context/BlogContext";
import AuthContext from "../../context/AuthContext";

const AddEditBlog: React.FC = () => {
  const { id } = useParams();
  const blogCtx = useContext(BlogContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode && blogCtx) {
      const existingBlog = blogCtx.blogs.find(blog => blog.id === id);
      if (existingBlog) {
        setTitle(existingBlog.title);
        setContent(existingBlog.content);
      }
    }
  }, [id, blogCtx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authCtx?.currentUser) {
      setError("You must be logged in.");
      return;
    }

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    if (!blogCtx) return;

    if (isEditMode) {
      blogCtx.editBlog(id!, title, content);
    } else {
      blogCtx.addBlog(title, content);
    }

    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          {isEditMode ? "✏️ Edit Blog" : "📝 Add New Blog"}
        </h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter blog title"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Content</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              required
              style={styles.textarea}
              placeholder="Write your blog content here..."
            />
          </div>

          <button
            type="submit"
            style={isEditMode ? styles.updateButton : styles.createButton}
          >
            {isEditMode ? "Update Blog" : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f9fafc",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "1rem",
    color: "#333",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: 600,
    display: "block",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
  },
  createButton: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  updateButton: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AddEditBlog;
