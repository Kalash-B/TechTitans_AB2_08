import React from "react";

const Home = () => {
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-green-800">Farm2Home</h1>
          <nav className="space-x-4">
            <a className="text-gray-700 hover:text-green-800" href="#">Shop</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Product</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Contact Us</a>
            <a className="text-gray-700 hover:text-green-800" href="#">Search</a>
            <a className="bg-green-800 text-white px-4 py-2 rounded" href="#">Login</a>
          </nav>
        </div>
      </header>

      <section className="relative">
        <img
          alt="A beautiful farm landscape with a sunrise"
          className="w-full h-96 object-cover"
          src="https://img.freepik.com/free-photo/green-field-with-sun_1160-878.jpg?semt=ais_hybrid"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black">
          <h1 className="text-4xl font-bold">Fresh And Organic Products For You</h1>
          <p className="mt-2 text-lg">From Our Farm To Your Home Without Any Intermediaries</p>
          <a className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded" href="#">Shop Now</a>
        </div>
      </section>

      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">How it works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Consumers", "LocalFarmers", "Farmers"].map((role, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
              <i className={`fas fa-${role === "Consumers" ? "user" : role === "LocalFarmers" ? "store" : "tree"} fa-3x text-green-600 mb-4`}></i>
              <h2 className="text-2xl font-semibold mb-4">{role}</h2>
              <ul className="text-left text-gray-700">
                {role === "Consumers" && (
                  <>
                    <li className="mb-2">• Order your favorite products from favorite farmers!</li>
                    <li className="mb-2">• Receive the products delivered to you!</li>
                    <li>• Review the Product, Farmer & LocalFarmers Team!</li>
                  </>
                )}
                {role === "LocalFarmers" && (
                  <>
                    <li className="mb-2">• Verify Farmer & Products!</li>
                    <li className="mb-2">• Publish Farmers & Products details!</li>
                    <li className="mb-2">• Consolidate orders from Customers!</li>
                    <li className="mb-2">• Arrange for Supply by Farmers!</li>
                    <li className="mb-2">• Procure, Segregate & Deliver to customers!</li>
                    <li>• Get customers' review on products & Service!</li>
                  </>
                )}
                {role === "Farmers" && (
                  <>
                    <li className="mb-2">• Produce healthy farm products free from harmful chemicals!</li>
                    <li className="mb-2">• Publish your products details & their prices!</li>
                    <li className="mb-2">• Get orders from Customers!</li>
                    <li className="mb-2">• Supply to consumers yourself or through LocalFarmers Supply Team!</li>
                    <li>• Get customers' review on your products!</li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
