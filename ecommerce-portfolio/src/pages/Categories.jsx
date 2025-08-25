import { useState, useEffect } from "react";
import { BsFillPlusCircleFill, BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import Toast from "../components/Toast";
import { validateForm } from '../utils/validator';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };
  const rules = {
    name: [{ type: "required", message: "El nombre de la categoría es obligatorio" }],
  };

  // Cargar desde localStorage al inicio
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(stored);
  }, []);

  // Guardar en localStorage cada vez que cambien
  const saveToLocalStorage = (data) => {
    localStorage.setItem("categories", JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(form, rules);

    if (Object.keys(errors).length > 0) {
      // mostramos el primer error encontrado
      console.log(errors)
      showToast(Object.values(errors)[0], "error");
      console.log()
      return;
    }

    if (editingId) {
      // Editar categoría
      const updated = categories.map((c) =>
        c.id === editingId ? { ...c, name: form.name } : c
      );
      setCategories(updated);
      saveToLocalStorage(updated);
      setEditingId(null);
      showToast("Categoría actualizada");
    } else {
      // Crear categoría
      const newCategory = { id: Date.now(), name: form.name };
      const updated = [...categories, newCategory];
      setCategories(updated);
      saveToLocalStorage(updated);
      showToast("Categoría agregada");
    }

    setForm({ name: "" });
  };


  const handleDelete = (id) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveToLocalStorage(updated);
    showToast("Categoría eliminada", "error");
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name });
    setEditingId(cat.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Nombre categoría"
          className="border rounded-lg px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-green-800 flex items-center gap-1"
        >
          <BsFillPlusCircleFill /> {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <ul className="bg-white rounded-lg shadow p-4">
        {categories.map((c) => (
          <li
            key={c.id}
            className="border-b py-2 flex justify-between items-center"
          >
            {c.name}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 hover:cursor-pointer"
              >
                <BsPencilFill />
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-800 hover:cursor-pointer"
              >
                <BsFillTrash3Fill />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Categories;
