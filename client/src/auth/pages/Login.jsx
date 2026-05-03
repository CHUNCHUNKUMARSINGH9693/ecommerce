import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', formData);

      if (data.success) {
        // ✅ Use context login to update global state
        login(data.user, data.token);
        navigate('/dashboard'); 
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#140a05] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
        <h1 className="text-3xl font-black text-white text-center mb-8 italic uppercase">
          Access <span className="text-orange-600">Vault</span>
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] text-orange-500 uppercase font-bold ml-2">Email Address</label>
            <input
              type="email" required
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-orange-600"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] text-orange-500 uppercase font-bold ml-2">Password</label>
            <input
              type="password" required
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-orange-600"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-500 text-xs">
          New here? <Link to="/register" className="text-white hover:text-orange-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;