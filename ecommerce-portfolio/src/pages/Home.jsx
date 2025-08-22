import { useState } from "react";
import ItemCard from "../components/ItemCard";
const categoriesMock = [
  {
    id: 1,
    name: "Tecnología",
    items: [
      {
        id: 101,
        title: "Laptop Gamer",
        description: "Potente laptop para juegos",
        price: 1200,
        discountPrice: 999,
        image: "https://via.placeholder.com/200",
      },
      {
        id: 102,
        title: "Auriculares Inalámbricos",
        description: "Sonido de alta calidad",
        price: 200,
        discountPrice: null,
        image: "https://via.placeholder.com/200",
      },
    ],
  },
  {
    id: 2,
    name: "Ropa",
    items: [
      {
        id: 201,
        title: "Camisa Casual",
        description: "Camisa fresca y moderna",
        price: 40,
        discountPrice: 30,
        image: "https://via.placeholder.com/200",
      },
    ],
  },
];

function Home() {
  const [categories] = useState(categoriesMock);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Categorías</h1>
      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{cat.name}</h2>
          <div className="grid grid-cols-2 max-[470px]:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {cat.items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
