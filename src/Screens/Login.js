import React, { useState } from "react";
import { BASE_URL } from "../config/url";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}api/auth/login`, {
        email,
        password,
      });
      const data = res.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      window.location.href = "/dashboard/slider";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="border p-4 rounded w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-lg font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
