import { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electrónica" },
    { id: 2, name: "Ropa" },
  ]);

  const [form, setForm] = useState({ name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { id: Date.now(), ...form };
    setCategories([...categories, newCategory]);
    setForm({ name: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre categoría"
          className="border rounded-lg px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Crear
        </button>
      </form>

      <ul className="bg-white rounded-lg shadow p-4">
        {categories.map((c) => (
          <li key={c.id} className="border-b py-2">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
