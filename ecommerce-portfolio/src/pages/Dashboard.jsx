import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import Categories from "../pages/Categories";
import Products from "../pages/Products";

function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">

            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                    }}
                    className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                >
                    Cerrar sesión
                </button>
                <Routes>
                    <Route path="/" element={<h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>} />
                    <Route path="users" element={<Users />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="products" element={<Products />} />
                </Routes>
            </main>
        </div>
    );
}

export default Dashboard;
