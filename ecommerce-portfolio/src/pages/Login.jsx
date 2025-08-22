import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 focus:outline-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-lg px-4 py-2 focus:outline-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
