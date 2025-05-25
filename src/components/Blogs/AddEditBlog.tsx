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
    <div>
      <h2>{isEditMode ? "Edit Blog" : "Add New Blog"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label><br />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>
        <button type="submit">{isEditMode ? "Update" : "Create"} Blog</button>
      </form>
    </div>
  );
};

export default AddEditBlog;
