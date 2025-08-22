import { useState } from "react";

function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: "admin", permissions: ["crear", "editar", "eliminar"] },
    { id: 2, name: "editor", permissions: ["editar"] },
  ]);

  const [form, setForm] = useState({ name: "", permissions: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      id: Date.now(),
      name: form.name,
      permissions: form.permissions.split(","),
    };
    setRoles([...roles, newRole]);
    setForm({ name: "", permissions: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Roles & Permisos</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre rol"
          className="border rounded-lg px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Permisos (coma separados)"
          className="border rounded-lg px-3 py-2"
          value={form.permissions}
          onChange={(e) => setForm({ ...form, permissions: e.target.value })}
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
          Crear
        </button>
      </form>

      <ul className="bg-white rounded-lg shadow p-4">
        {roles.map((r) => (
          <li key={r.id} className="border-b py-2">
            <strong>{r.name}</strong> → {r.permissions.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Roles;
