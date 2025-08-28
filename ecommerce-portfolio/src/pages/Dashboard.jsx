import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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

                {/* 👇 Aquí se mostrarán las páginas hijas */}
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;
