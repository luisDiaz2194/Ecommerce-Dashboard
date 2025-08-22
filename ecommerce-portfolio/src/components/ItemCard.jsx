function ItemCard({ item }) {
  return (
    <div className="rounded-2xl shadow-md border p-4 hover:shadow-xl hover:-translate-y-1 transition bg-white">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
      <div className="mt-2 flex items-center gap-2">
        {item.discountPrice ? (
          <>
            <span className="text-red-500 font-bold text-lg">
              ${item.discountPrice}
            </span>
            <span className="line-through text-gray-400 text-sm">
              ${item.price}
            </span>
          </>
        ) : (
          <span className="font-bold text-lg">${item.price}</span>
        )}
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Comprar
      </button>
    </div>
  );
}

export default ItemCard;
