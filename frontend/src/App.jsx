import React from "react";
import Home from "./components/Home";
import "./index.css";
import GoogleMapComponent from "./components/GoogleMapComponent";
import AuthForm from "./components/AuthForm";
import Product from "./components/Products";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Nearby Farmers (20km)</h1>
        <GoogleMapComponent />
      </div>
    </div>
    <AuthForm />
    <Home />
    <Product />
    <ProductList />
    <AddProduct />
    </div>
  );
}

export default App;
