import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
        <Routes>
          <Route path="/" element={<h1>Bienvenido al Dashboard</h1>} />
          <Route path="categories" element={<h2>Gestión de Categorías</h2>} />
          <Route path="products" element={<h2>Gestión de Productos</h2>} />
          <Route path="users" element={<h2>Gestión de Usuarios</h2>} />
          <Route path="roles" element={<h2>Gestión de Roles & Permisos</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
