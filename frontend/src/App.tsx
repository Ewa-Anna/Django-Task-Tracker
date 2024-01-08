import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import UserProfile from "./components/pages/userProfile/UserProfile";
import Register from "./components/pages/register/Register";
import SignIn from "./components/pages/signIn/SignIn";
import PrivateRoutes from "./components/pages/privateRoutes/PrivateRoutes";
import PublicRoutes from "./components/pages/privateRoutes/PublicRoutes";

function App() {
  const user = "a";
  return (
    <div className="app">
      <Router>
        <Routes>
       {/* private routes */}
<Route element={<PrivateRoutes user={user}/>}>
<Route  element={<Layout>
  <Dashboard/>
</Layout>} path="/"/>
<Route  element={<Layout>
  <UserProfile/>
</Layout>} path="/"/>
</Route>

{/* public routes */}
<Route path="register" element={user?<Navigate to="/"/>:<Register/>}/>
<Route path="sign-in" element={user?<Navigate to="/"/>:<SignIn/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
