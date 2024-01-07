import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import UserProfile from "./components/pages/userProfile/UserProfile";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
    <Route
  path="/user-profile" // Poprawiona ścieżka
  element={
    <Layout>
      <UserProfile />
    </Layout>
  }
/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
