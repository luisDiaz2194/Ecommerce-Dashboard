import { NavLink } from "react-router-dom";

function Sidebar() {
  const activeClass = "bg-gray-500 text-white rounded-lg px-4 py-2 block";
  const normalClass = "text-white-700 hover:bg-gray-200 rounded-lg px-4 py-2 block";

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <NavLink to="/dashboard" end className={({ isActive }) => isActive ? activeClass : normalClass}>
        Inicio
      </NavLink>
      <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? activeClass : normalClass}>
        Usuarios
      </NavLink>
      <NavLink to="/dashboard/roles" className={({ isActive }) => isActive ? activeClass : normalClass}>
        Roles & Permisos
      </NavLink>
      <NavLink to="/dashboard/categories" className={({ isActive }) => isActive ? activeClass : normalClass}>
        Categorías
      </NavLink>
      <NavLink to="/dashboard/products" className={({ isActive }) => isActive ? activeClass : normalClass}>
        Productos
      </NavLink>
    </aside>
  );
}

export default Sidebar;
