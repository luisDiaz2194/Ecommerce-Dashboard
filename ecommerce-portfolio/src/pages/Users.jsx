import { useState, useEffect } from "react";
import { BsFillPlusCircleFill, BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "viewer", password: "" });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Inicializar admin fijo
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.length === 0) {
      const initialAdmin = {
        id: Date.now(),
        name: "Admin",
        email: "admin@test.com",
        role: "admin",
        password: "1234", // contraseña inicial
        fixed: true,       // no se puede borrar ni modificar
      };
      localStorage.setItem("users", JSON.stringify([initialAdmin]));
      setUsers([initialAdmin]);
    } else {
      setUsers(storedUsers);
    }
  }, []);

  // Validación de formulario
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nombre requerido";
    if (!form.email.trim()) newErrors.email = "Email requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";
    if (!form.password.trim()) newErrors.password = "Contraseña requerida";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingId) {
      // Editar usuario existente
      const updatedUsers = users.map((u) =>
        u.id === editingId ? { ...u, ...form } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEditingId(null);
    } else {
      // Crear nuevo usuario
      const newUser = { ...form, id: Date.now() };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    setForm({ name: "", email: "", role: "viewer", password: "" });
    setErrors({});
  };

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id);
    if (user.fixed) return; // no se puede borrar
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEdit = (user) => {
    if (user.fixed) return; // no se puede editar
    setForm({ name: user.name, email: user.email, role: user.role, password: user.password });
    setEditingId(user.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`border rounded-lg px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`border rounded-lg px-3 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={`border rounded-lg px-3 py-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border rounded-lg px-3 py-2"
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-green-800 flex items-center gap-1"
        >
          <BsFillPlusCircleFill /> {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Tabla */}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Nombre</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="hover:cursor-pointer bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
                >
                  <BsPencilFill />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="hover:cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 flex items-center gap-1"
                >
                  <BsFillTrash3Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
