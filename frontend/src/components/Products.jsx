import React from "react";

const products = [
  {
    id: 1,
    name: "Capsicum - Green (Loose)",
    brand: "fresho!",
    price: 36,
    originalPrice: 72.6,
    discount: "50% OFF",
    image:
      "https://storage.googleapis.com/a1aa/image/kS4qLYLXmb8Fxrm9tqkAg9zKBafGJ9gqO9hFHHMOQ6w.jpg",
  },
  {
    id: 2,
    name: "Carrot - Orange (Loose)",
    brand: "fresho!",
    price: 42,
    originalPrice: 61.64,
    discount: "32% OFF",
    image:
      "https://storage.googleapis.com/a1aa/image/lIEb2aE-sT3u27oOGUEMhFVFuXXYUcuZA5dno3HNJRI.jpg",
  },
  {
    id: 3,
    name: "Cauliflower",
    brand: "fresho!",
    price: 19,
    originalPrice: 32.88,
    discount: "42% OFF",
    image:
      "https://storage.googleapis.com/a1aa/image/1Syh6a28IVJkWBA1YZIYlia5PGR_dYuKhMVxTwIJ66w.jpg",
  },
  {
    id: 4,
    name: "Capsicum - Green (Loose)",
    brand: "fresho!",
    price: 36,
    originalPrice: 72.6,
    discount: "50% OFF",
    image:
      "https://storage.googleapis.com/a1aa/image/kS4qLYLXmb8Fxrm9tqkAg9zKBafGJ9gqO9hFHHMOQ6w.jpg",
  },
  {
    id: 5,
    name: "Carrot - Orange (Loose)",
    brand: "fresho!",
    price: 42,
    originalPrice: 61.64,
    discount: "32% OFF",
    image:
      "https://storage.googleapis.com/a1aa/image/lIEb2aE-sT3u27oOGUEMhFVFuXXYUcuZA5dno3HNJRI.jpg",
  },
  {
    id: 6,
    name: "Cauliflower",
    brand: "fresho!",
    price: 19,
    originalPrice: 32.88,
    discount: "42% OFF",
    image:
      "https://storage.googleapis.com/a1aa/image/1Syh6a28IVJkWBA1YZIYlia5PGR_dYuKhMVxTwIJ66w.jpg",
  },
];

const Product = () => {
  return (
    <div className="container mx-auto p-4 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-4">Shop by Category</h2>
        <ul className="space-y-2">
          <li>
            <a className="text-gray-700 hover:text-green-600" href="#">
              Fruits
            </a>
          </li>
          <li>
            <a className="text-gray-700 hover:text-green-600" href="#">
              Vegetables
            </a>
          </li>
          <li>
            <a className="text-gray-700 hover:text-green-600" href="#">
              Foodgrains, Oil & Masala
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <h3 className="text-gray-800 font-semibold">{product.name}</h3>
              <select className="mt-2 w-full border border-gray-300 rounded p-2">
                <option>1 kg</option>
              </select>
              <div className="flex items-center mt-2">
                <span className="text-red-600 font-bold text-lg">₹{product.price}</span>
                <span className="text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
              </div>
              <button className="mt-2 w-full bg-green-100 text-green-600 font-semibold py-2 rounded">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
