
import "./App.css";
import React from "react";
import Dashboarad from "./pages/Dashboarad";
import { Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import ProjectDetails from "./components/ProjectDetails";
import AuthLayout from "./components/AuthLayout";
import NewProject from "./pages/NewProject";
import NewTicket from "./pages/NewTicket";


const App: React.FC = () => {


  return (
    <main className="bg-gray-100 h-screen w-full overflow-hidden ">
      <Routes>

        <Route element={<MainLayout />} >
          <Route index path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/new" element={<NewProject />} />
          <Route path="/ticket/new" element={<NewTicket />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/project/:id" element={<ProjectDetails />} />


        </Route>

        <Route element={<AuthLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />



        </Route>
      </Routes>

    </main>
  )
}

export default App
