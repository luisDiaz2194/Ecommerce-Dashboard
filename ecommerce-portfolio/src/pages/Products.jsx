import { useState, useEffect } from "react";
import { BsFillPlusCircleFill, BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import Toast from "../components/Toast";
import { validateForm } from "../utils/validator";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    imageCover: "",
    thumbnails: [],
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const rules = {
    title: [{ type: "required", message: "El título es obligatorio" }],
    price: [{ type: "required", message: "El precio es obligatorio" }],
    category: [{ type: "required", message: "La categoría es obligatoria" }],
    imageCover: [{ type: "required", message: "La portada es obligatoria" }],
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
  };

  // Abrir widget Cloudinary para subir portada
  const handleUploadCover = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName, // 🔹 reemplaza con tu cloud name
        uploadPreset: uploadPreset, // 🔹 el preset que creaste
        sources: ["local", "camera"],
        multiple: false,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setForm({ ...form, imageCover: result.info.secure_url });
          showToast("Portada subida con éxito");
        }
      }
    );
  };

  //Abrir widget Cloudinary para subir thumbnails
  const handleUploadThumbnails = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName, // ahora usa la variable
        uploadPreset: uploadPreset, // ahora usa la variable
        sources: ["local", "camera"],
        multiple: true,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setForm((prevForm) => ({
            ...prevForm,
            thumbnails: [...prevForm.thumbnails, result.info.secure_url],
          }));
          showToast("Thumbnail agregado");
        }

      }
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(form, rules);
    if (Object.keys(errors).length > 0) {
      showToast(Object.values(errors)[0], "error");
      return;
    }

    if (editingId) {
      const updated = products.map((p) =>
        p.id === editingId ? { ...form, id: editingId } : p
      );
      setProducts(updated);
      saveToLocalStorage(updated);
      setEditingId(null);
      showToast("Producto actualizado");
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
      };
      const updated = [...products, newProduct];
      setProducts(updated);
      saveToLocalStorage(updated);
      showToast("Producto agregado");
    }

    setForm({
      title: "",
      description: "",
      price: "",
      discountPrice: "",
      imageCover: "",
      thumbnails: [],
      category: "",
    });
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToLocalStorage(updated);
    showToast("Producto eliminado", "error");
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      imageCover: product.imageCover,
      thumbnails: product.thumbnails,
      category: product.category,
    });
    setEditingId(product.id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Productos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Título"
          className="border rounded-lg px-3 py-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio"
          className="border rounded-lg px-3 py-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Precio descuento"
          className="border rounded-lg px-3 py-2"
          value={form.discountPrice}
          onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
        />

        {/* Portada */}
        <div className="col-span-2 flex items-center gap-4">
          <button
            type="button"
            onClick={handleUploadCover}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-700"
          >
            Subir Portada
          </button>
          {form.imageCover && (
            <img src={form.imageCover} alt="cover" className="w-16 h-16 object-cover rounded" />
          )}
        </div>

        {/* Thumbnails */}
        <div className="col-span-1 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleUploadThumbnails}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-green-800 flex items-center gap-1 justify-center"
          >
            Agregar Thumbnails
          </button>
          <div className="flex gap-2 flex-wrap">
            {form.thumbnails.map((thumb, i) => (
              <img
                key={i}
                src={thumb}
                alt="thumb"
                className="w-12 h-12 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <textarea
          placeholder="Descripción"
          className="border rounded-lg px-3 py-2 col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-green-800 flex items-center gap-1 justify-center">
          <BsFillPlusCircleFill /> {editingId ? "Actualizar producto" : "Crear producto"}
        </button>
      </form>

      {/* Grid de productos */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <img
              src={p.imageCover}
              alt={p.title}
              className="w-32 h-32 object-cover mb-2 rounded"
            />
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-lg font-bold">
              ${p.discountPrice || p.price}
              {p.discountPrice && (
                <span className="line-through text-gray-400 ml-2">${p.price}</span>
              )}
            </p>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-1">
              {p.category}
            </span>

            {/* thumbnails */}
            {p.thumbnails.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {p.thumbnails.map((thumb, i) => (
                  <img
                    key={i}
                    src={thumb}
                    alt="thumb"
                    className="w-10 h-10 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700"
              >
                <BsPencilFill />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-800"
              >
                <BsFillTrash3Fill />
              </button>
            </div>
          </div>
        ))}
      </div>

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

export default Products;
