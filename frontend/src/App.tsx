import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import AuthLayout from "./_auth/forms/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "./_auth/forms/SignupForm";
import { Toaster } from "./components/ui/toaster";
import CreateProject from "./_root/pages/CreateProject";
import AllUsers from "./_root/pages/AllUsers";
import CreateTicket from "./_root/pages/CreateTicket";
import EditProject from "./_root/pages/EditProject";
import EditTicket from "./_root/pages/EditTicket";
import ProjectDetails from "./_root/pages/ProjectDetails";
import TicketDetails from "./_root/pages/TicketDetails";
import Profile from "./_root/pages/Profile";
import Tickets from "./_root/pages/Tickets";
import Projects from "./_root/pages/Projects";


function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="create-ticket" element={<CreateTicket />} />
          <Route path="edit-project:/id" element={<EditProject />} />
          <Route path="edit-ticket/:id" element={<EditTicket />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="ticket/:id" element={<TicketDetails />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
