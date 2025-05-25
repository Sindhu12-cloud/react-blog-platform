// src/context/BlogContext.tsx
import { createContext, useState, useEffect, } from "react";
import type{ReactNode} from "react";
import type { Blog, BlogContextType } from "../types/types";

const BlogContext = createContext<BlogContextType | null>(null);

const BLOGS_KEY = "blogs";

const getBlogsFromStorage = (): Blog[] => {
  const blogs = localStorage.getItem(BLOGS_KEY);
  return blogs ? JSON.parse(blogs) : [];
};

const saveBlogsToStorage = (blogs: Blog[]) => {
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
};

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>(getBlogsFromStorage());

  useEffect(() => {
    saveBlogsToStorage(blogs);
  }, [blogs]);

  const addBlog = (title: string, content: string) => {
    const newBlog: Blog = {
      id: Date.now().toString(),
      title,
      content,
      authorId: JSON.parse(localStorage.getItem("currentUser") || "{}")?.id,
      createdAt: new Date().toISOString(),
    };
    setBlogs(prev => [...prev, newBlog]);
  };

  const editBlog = (id: string, title: string, content: string) => {
    setBlogs(prev =>
      prev.map(blog =>
        blog.id === id ? { ...blog, title, content } : blog
      )
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
