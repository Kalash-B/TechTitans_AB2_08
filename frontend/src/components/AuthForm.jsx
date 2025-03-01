import { useState } from "react";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true); // Toggle between Register & Login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                onChange={handleChange}
                required
              />
              <select
                name="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
