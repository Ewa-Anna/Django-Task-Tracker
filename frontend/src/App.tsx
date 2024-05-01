import "./App.css";
import React from "react";
import { Toaster } from "react-hot-toast";
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
import Users from "./pages/Users";
import EditProject from "./pages/EditProject";
import TicketDetails from "./components/TicketDetails";
import EditTicket from "./pages/EditTicket";
import UserDetails from "./components/UserDetails";
import Archive from "./pages/Archive";
import OnboardingLayout from "./pages/OnboardingLayout";
import OnboardPage from "./pages/OnboardPage";

const App: React.FC = () => {
  return (
    <main className="bg-gray-100 h-screen w-full overflow-hidden ">
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/new" element={<NewProject />} />
          <Route path="/ticket/new" element={<NewTicket />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/project/edit/:id" element={<EditProject />} />
          <Route path="/ticket/edit/:id" element={<EditTicket />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/archive" element={<Archive />} />
        </Route>

        <Route element={<OnboardingLayout />}>
          <Route index path="/onboarding" element={<OnboardPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
