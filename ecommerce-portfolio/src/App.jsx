import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Página pública */}
          <Route path="/" element={<Home />} />

          {/* Login Admin */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard protegido */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
