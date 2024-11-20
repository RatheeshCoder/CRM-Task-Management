// File: src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Index from "./pages/message";
import StudentList from "./pages/studentView/StudentList";
import AssignTask from "./pages/assignTask/AssignTask";
import Notifications from "./pages/notifications/Notifications";
import LinkedInPostCreator from "./pages/LinkedInPost/LinkedInPost";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/RegisterPage" element={<AuthLayout><RegisterPage /></AuthLayout>} />
        
        <Route path="/homePage" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/addnewstudent" element={<MainLayout><Index /></MainLayout>} />
        <Route path="/studentslist" element={<MainLayout><StudentList /></MainLayout>} />
        <Route path="/assigntask" element={<MainLayout><AssignTask /></MainLayout>} />
        <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
        <Route path="/linkedinpost" element={<MainLayout><LinkedInPostCreator /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
