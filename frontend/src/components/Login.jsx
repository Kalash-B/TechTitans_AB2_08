import React from "react";

const Login = () => {
  return (
    <div className="bg-green-100 flex flex-col items-center justify-center min-h-screen">
      
      <div className="bg-green-200 p-8 rounded-lg shadow-lg mt-10 w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              User Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white text-black border border-black px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <a href="register.html" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
