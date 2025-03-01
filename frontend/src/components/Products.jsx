import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products${category ? `?category=${category}` : ""}`
      );
      setProducts(response.data);
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleBuyClick = (product) => {
    navigate(`/buy/${product._id}`, { state: { product } });
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate("/auth");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-lime-300 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center font-[Newsreader]">
          <h1 className="text-2xl font-semibold text-green-800">Farm2Home</h1>
          <nav className="space-x-4">
            <a className="text-gray-700 hover:text-green-800" href="#">Shop</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Product</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Contact Us</a>
            {role === "farmer" ? (
              <>
                <Link to="/add-product">
                  <button className="bg-green-800 text-white px-4 py-2 rounded">Add Product</button>
                </Link>
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
                  Logout
                </button>
              </>
            ) : role === "customer" ? (
              <>
                <Link to="/dashboard">
                  <button className="bg-green-800 text-white px-4 py-2 rounded">Nearby Farmers</button>
                </Link>
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth">
                <button className="bg-green-800 text-white px-4 py-2 rounded">Login / Register</button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-4 flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-4">Filter by Category</h2>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Product List */}
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.productName}
                className="w-full h-60 object-contain rounded"
              />
              <h3 className="text-gray-800 font-semibold mt-2">{product.productName}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <span className="text-red-600 font-bold text-lg">
                ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <button
                className="mt-2 w-full bg-green-100 text-green-600 font-semibold py-2 rounded"
                onClick={() => handleBuyClick(product)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
