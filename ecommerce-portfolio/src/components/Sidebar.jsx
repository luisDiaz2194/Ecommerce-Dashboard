import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/dashboard/categories", label: "Categorías" },
    { to: "/dashboard/products", label: "Productos" },
    { to: "/dashboard/users", label: "Usuarios" },
    { to: "/dashboard/roles", label: "Roles & Permisos" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `p-2 rounded transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
