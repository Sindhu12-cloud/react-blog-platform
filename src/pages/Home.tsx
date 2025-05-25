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
    <div>
      <h2>All Blogs</h2>

      {currentUser && (
        <div>
          <p>Welcome, <strong>{currentUser.email}</strong></p>
          <button onClick={() => authCtx?.logout()}>Logout</button>
          <button onClick={() => navigate("/add-blog")}>Add New Blog</button>
        </div>
      )}

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul>
          {blogs.map(blog => (
            <li key={blog.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <small>Posted on: {new Date(blog.createdAt).toLocaleString()}</small>
              {currentUser?.id === blog.authorId && (
                <div>
                  <button onClick={() => navigate(`/edit-blog/${blog.id}`)}>Edit</button>
                  <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
