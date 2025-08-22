function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Categorías
          </a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Productos
          </a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Usuarios
          </a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Roles & Permisos
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
        <p className="text-gray-600">
          Aquí podrás administrar categorías, productos, usuarios y más.
        </p>
      </main>
    </div>
  );
}

export default Dashboard;
