import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, X } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        formData
      );

      if (data.success) {
        // Save registered email
        const savedEmails =
          JSON.parse(localStorage.getItem('registeredEmails')) || [];

        const updatedEmails = [
          ...new Set([...savedEmails, formData.email]),
        ];

        localStorage.setItem(
          'registeredEmails',
          JSON.stringify(updatedEmails)
        );

        // Optional token save
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        alert('✅ Registration Successful');

        navigate('/login');
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          '❌ Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">

      {/* Main Card */}
      <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h1 className="text-2xl font-bold text-slate-800">
            Create Account
          </h1>

          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >

          {/* Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all shadow-sm"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <div className="pt-2 text-center sm:text-left">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-600 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;