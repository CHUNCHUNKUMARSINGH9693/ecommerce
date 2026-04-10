import React, { useState } from 'react';
import axios from 'axios'; // Ensure you have run: npm install axios

const TicketForm = () => {
  const [formData, setFormData] = useState({
    issueType: 'General Inquiry',
    priority: 'Low',
    subject: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- UPDATED SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. Send the data to your backend endpoint
      // Adjust the URL if your server runs on a different port (e.g., 5000)
      const response = await axios.post('http://localhost:5000/api/support/create', formData);

      if (response.data.success) {
        alert("Success! Your ticket is stored in MongoDB.");
        // 2. Reset form on success
        setFormData({ issueType: 'General Inquiry', priority: 'Low', subject: '', description: '' });
      }
    } catch (error) {
      console.error("Database connection error:", error);
      alert(error.response?.data?.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-8 space-y-8 bg-[#140a05] rounded-[2.5rem]" onSubmit={handleSubmit}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-orange-500/80 ml-1">
            Issue Type
          </label>
          <select 
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="w-full bg-[#1a0f0a] border border-white/10 text-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all cursor-pointer"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Property Listing Issue">Property Listing Issue</option>
            <option value="Technical Bug">Technical Bug</option>
            <option value="Payment/Billing">Payment/Billing</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-orange-500/80 ml-1">
            Priority Level
          </label>
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-[#1a0f0a] border border-white/10 text-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all cursor-pointer"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-orange-500/80 ml-1">
          Subject Line
        </label>
        <input 
          type="text" 
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Briefly describe the issue"
          className="w-full bg-[#1a0f0a] border border-white/10 text-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none placeholder:text-gray-600 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-orange-500/80 ml-1">
          Detailed Description
        </label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5" 
          placeholder="Tell us more so we can help you better..."
          className="w-full bg-[#1a0f0a] border border-white/10 text-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-600 outline-none placeholder:text-gray-600 transition-all resize-none"
        ></textarea>
      </div>

      <div className="pt-4">
        <button 
          type="submit"
          disabled={loading}
          className={`w-full bg-orange-600 text-white font-black py-4 rounded-2xl text-xs uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-xl ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;