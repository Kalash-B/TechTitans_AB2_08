import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GoogleMapComponent from "./components/GoogleMapComponent";
import AuthForm from "./components/AuthForm";
import Product from "./components/Products";
import AddProduct from "./components/AddProduct";
import Footer from "./components/Footer";
import BuyProduct from "./components/BuyProduct";
import OrderTracking from "./components/OrderTracking";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route
              path="/dashboard"
              element={
                <div className="flex justify-center items-center h-screen bg-gray-100">
                  <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-xl">
                    <h1 className="text-2xl font-bold mb-4 text-center">Nearby Farmers (20km)</h1>
                    <GoogleMapComponent />
                  </div>
                </div>
              }
            />
            <Route path="/products" element={<Product />} />
            <Route path="/buy/:id" element={<BuyProduct />} />
            <Route path="/orders" element={<OrderTracking />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
