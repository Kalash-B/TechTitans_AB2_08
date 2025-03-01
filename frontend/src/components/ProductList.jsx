import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products/");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Products for Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <img src={`http://localhost:5000${product.image}`} alt={product.productName} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-bold mt-2">{product.productName}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">₹{product.price} <span className="line-through text-red-500">₹{(product.price * (1 + product.discount / 100)).toFixed(2)}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
