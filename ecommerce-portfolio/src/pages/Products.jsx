import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    image: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), ...form };
    setProducts([...products, newProduct]);
    setForm({
      title: "",
      description: "",
      price: "",
      discountPrice: "",
      image: "",
      category: "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Productos</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Título"
          className="border rounded-lg px-3 py-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoría"
          className="border rounded-lg px-3 py-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
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
        <input
          type="text"
          placeholder="Imagen URL"
          className="border rounded-lg px-3 py-2 col-span-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          className="border rounded-lg px-3 py-2 col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-lg col-span-2"
          type="submit"
        >
          Crear producto
        </button>
      </form>

      {/* Grid de productos */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-32 h-32 object-cover mb-2 rounded"
            />
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-lg font-bold">
              ${p.discountPrice || p.price}
              {p.discountPrice && (
                <span className="line-through text-gray-400 ml-2">
                  ${p.price}
                </span>
              )}
            </p>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-1">
              {p.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
