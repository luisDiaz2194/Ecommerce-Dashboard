import { useState, useEffect } from "react";

function ProductosPorCategorias() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setProducts(storedProducts);
        setCategories(storedCategories);
    }, []);

    // Filtrado dinámico
    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Productos por Categorías</h2>

            {/* Selector de categorías */}
            <div className="mb-6 flex gap-4 items-center">
                <label className="font-semibold">Categoría:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-white text-gray-800"
                >
                    <option value="All" className="bg-white text-gray-800">All</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.name} className="bg-white text-gray-800">
                            {c.name}
                        </option>
                    ))}
                </select>


            </div>

            {/* Listado de productos */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                    {filteredProducts.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
                        >
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
            ) : (
                <p className="text-gray-600">No hay productos en esta categoría.</p>
            )}
        </div>
    );
}

export default ProductosPorCategorias;
