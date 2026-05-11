import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { X, Mail } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [savedEmails, setSavedEmails] = useState([]);
  const [showEmails, setShowEmails] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Load saved emails
  useEffect(() => {
    const emails =
      JSON.parse(localStorage.getItem('registeredEmails')) || [];

    setSavedEmails(emails);
  }, []);

  // Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        formData
      );

      if (data.success) {
        // Save email in localStorage
        const updatedEmails = [
          ...new Set([...savedEmails, formData.email]),
        ];

        localStorage.setItem(
          'registeredEmails',
          JSON.stringify(updatedEmails)
        );

        login(data.user, data.token);

        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  // Login using saved email
  const handleEmailClick = async (email) => {
    const password = prompt(`Enter password for ${email}`);

    if (!password) return;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        {
          email,
          password,
        }
      );

      if (data.success) {
        login(data.user, data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[450px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h1 className="text-xl font-bold text-slate-800">
            Login
          </h1>

          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-6 space-y-4"
        >
          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          {/* Login Button */}
          <button className="w-full bg-[#f3535f] hover:bg-[#e44652] text-white font-semibold py-3 rounded-lg transition-colors shadow-sm">
            Log in
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>

            <span className="flex-shrink mx-4 text-slate-400 text-sm">
              or
            </span>

            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Continue with email */}
          <button
            type="button"
            onClick={() => setShowEmails(!showEmails)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg transition-colors"
          >
            <Mail
              size={18}
              className="text-red-500"
            />
            Continue with email
          </button>

          {/* Saved Emails */}
          {showEmails && savedEmails.length > 0 && (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {savedEmails.map((email, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmailClick(email)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b last:border-b-0 border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail
                      size={16}
                      className="text-red-500"
                    />

                    <span className="text-slate-700">
                      {email}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Register */}
          <div className="pt-4 text-center sm:text-left">
            <p className="text-sm text-slate-600">
              New to Food king ?{' '}
              <Link
                to="/register"
                className="text-red-500 hover:underline font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;