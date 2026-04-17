import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    issueType: 'General Inquiry',
    priority: 'Low',
    subject: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.description) {
      triggerToast("All fields are required", "error");
      return;
    }

    setLoading(true);

    try {
      // ✅ FIXED URL: Added /v1/ to match your server.js configuration
      const response = await axios.post('http://localhost:5000/api/v1/support/create', formData);

      if (response.data.success) {
        triggerToast("Ticket Transmitted to Vault");
        setFormData({ issueType: 'General Inquiry', priority: 'Low', subject: '', description: '' });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMsg = error.response?.status === 404 
        ? "API Route Not Found (Check v1 prefix)" 
        : "Vault Connection Failed";
      triggerToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* --- FLOATING NOTIFICATION BUBBLE --- */}
      {notification && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-4 px-8 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in slide-in-from-top-10 duration-500 ${
          notification.type === 'success' 
          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
          : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap">
            {notification.message}
          </span>
        </div>
      )}

      {/* --- FORM UI --- */}
      <form className="p-8 space-y-8 bg-[#140a05] rounded-[2.5rem] border border-white/5 shadow-2xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-black text-orange-600/60 ml-1">Issue</label>
            <select name="issueType" value={formData.issueType} onChange={handleChange} className="w-full bg-[#0a0503] border border-white/10 text-gray-300 rounded-2xl p-4 focus:border-orange-600 outline-none transition-all appearance-none cursor-pointer">
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Bug">Technical Bug</option>
              <option value="Payment/Billing">Payment/Billing</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-black text-orange-600/60 ml-1">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="w-full bg-[#0a0503] border border-white/10 text-gray-300 rounded-2xl p-4 focus:border-orange-600 outline-none transition-all appearance-none cursor-pointer">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-black text-orange-600/60 ml-1">Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-[#0a0503] border border-white/10 text-white rounded-2xl p-4 focus:border-orange-600 outline-none" placeholder="Summary" />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-black text-orange-600/60 ml-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full bg-[#0a0503] border border-white/10 text-white rounded-2xl p-4 focus:border-orange-600 outline-none resize-none" placeholder="Details..." />
        </div>

        <button type="submit" disabled={loading} className="group w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] bg-orange-600 text-white hover:bg-orange-500 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl">
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
          {loading ? 'Transmitting...' : 'Submit to Vault'}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;