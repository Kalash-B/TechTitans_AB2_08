import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center">Loading order details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!order) return <p className="text-center text-gray-500">Order not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">Order Tracking</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6">
        <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
        <p><strong>Product:</strong> {order.productId?.productName}</p>
        <p><strong>Customer:</strong> {order.customerId?.name}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Price:</strong> ₹{order.price}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-3 py-1 rounded ${
            order.status === "Pending" ? "bg-yellow-500" :
            order.status === "Shipped" ? "bg-blue-500" : "bg-green-500"
          } text-white`}>
            {order.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderTracking;
