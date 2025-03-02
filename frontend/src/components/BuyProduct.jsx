import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BuyProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState(localStorage.getItem("username") || "");
  const [address, setAddress] = useState("");

  // ✅ Handle Order Function with Confirmation
  const handleOrder = async (paymentMethod) => {
    if (!product || !product._id) {
      alert("❌ Invalid product. Please try again.");
      return;
    }

    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("⚠️ User not logged in. Redirecting to login.");
      navigate("/auth");
      return;
    }

    if (!customerName.trim() || !address.trim()) {
      alert("⚠️ Please enter your name and address.");
      return;
    }

    const finalPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
    
    // ✅ Confirmation Prompt Before Ordering
    const confirmOrder = window.confirm(
      `Confirm your order for ${product.productName} at ₹${finalPrice} using ${paymentMethod}?`
    );

    if (!confirmOrder) return;

    const orderData = {
      productId: product._id,
      customerId: storedUserId,
      customerName,
      address,
      paymentMethod,
      price: finalPrice, // ✅ Include final price in order data
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/orders/place", orderData);
      if (response.status === 201) {
        alert("✅ Order placed successfully! 🎉");
        navigate("/orders");
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("❌ Failed to place order. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <p className="text-center text-red-500 font-bold mt-10">❌ Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">🛒 Buy {product.productName}</h1>
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
          {product.discount > 0 && (
            <span className="text-sm text-red-500 line-through ml-2">₹{product.price}</span>
          )}
        </p>

        {/* 🏷️ Customer Details Form */}
        <div className="mt-4">
          <label className="block font-semibold">Your Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label className="block font-semibold mt-3">Delivery Address:</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* ✅ Payment Options */}
        <h3 className="text-lg font-semibold mt-4">💳 Choose Payment Method:</h3>
        <div className="mt-2 space-y-2">
          <button
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleOrder("UPI")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with UPI"}
          </button>
          <button
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handleOrder("COD")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Cash on Delivery"}
          </button>
          <button
            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => handleOrder("Card")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with Card"}
          </button>
        </div>

        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={() => navigate(-1)}
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyProduct;
