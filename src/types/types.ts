// src/types/types.ts

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string; // reference to User.id
  createdAt: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => boolean;
}

export interface BlogContextType {
  blogs: Blog[];
  addBlog: (title: string, content: string) => void;
  editBlog: (id: string, title: string, content: string) => void;
  deleteBlog: (id: string) => void;
}
