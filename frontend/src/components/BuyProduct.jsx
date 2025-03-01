import { useLocation, useNavigate, useParams } from "react-router-dom";

const BuyProduct = () => {
  const { id } = useParams(); // Get Product ID from URL
  const location = useLocation(); // Get product data passed from Product.jsx
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p className="text-center text-red-500 font-bold mt-10">Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">Buy {product.productName}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.productName}
          className="w-full h-60 object-contain rounded"
        />
        <h3 className="text-xl font-semibold mt-4">{product.productName}</h3>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-gray-700 font-bold text-lg mt-2">
          ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
        </p>

        {/* Payment Options */}
        <h3 className="text-lg font-semibold mt-4">Choose Payment Method:</h3>
        <div className="mt-2 space-y-2">
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Pay with UPI
          </button>
          <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Cash on Delivery
          </button>
          <button className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Pay with Card
          </button>
        </div>

        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyProduct;
