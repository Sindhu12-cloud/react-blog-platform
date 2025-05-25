// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Home from "./pages/Home";
import AddEditBlog from "./components/Blogs/AddEditBlog";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Layout/Navbar";
import PrivateRoute from "./utils/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add-blog" element={<PrivateRoute><AddEditBlog /></PrivateRoute>} />
        <Route path="/edit-blog/:id" element={<PrivateRoute><AddEditBlog /></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
  
};

export default App;
