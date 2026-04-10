import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input change (clean method)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        formData
      );

      if (data.success) {
        alert("✅ Registration Successful!");

        // Optional: store token
        localStorage.setItem('token', data.token);

        navigate('/login');
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0503] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#140a05] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
        
        <h1 className="text-3xl font-black text-white text-center mb-8 italic uppercase">
          Join <span className="text-orange-600">Utkarsh</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-[10px] text-orange-500 uppercase font-bold ml-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Jay Singh"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[10px] text-orange-500 uppercase font-bold ml-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="jay@utkarsh.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-[10px] text-orange-500 uppercase font-bold ml-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-xs">
          Already a member?{" "}
          <Link to="/login" className="text-white hover:text-orange-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;