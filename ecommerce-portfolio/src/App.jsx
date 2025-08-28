import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ProductosPorCategorias from "./pages/ProductosPorCategorias";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Categories from "./pages/Categories";
import Products from "./pages/Products";

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
          >
            <Route index element={<h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>} />
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="productos-por-categorias" element={<ProductosPorCategorias />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
