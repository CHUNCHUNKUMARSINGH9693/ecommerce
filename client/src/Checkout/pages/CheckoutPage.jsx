import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const amount = location.state?.total || 0;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    if (amount <= 0) {
      setErrorMessage("Invalid amount.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem('token'); 

      // 1. Create Order on your backend
      const { data } = await API.post('/payments/razorpay-order', 
        { amount: Number(amount) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // 2. Configure Razorpay Checkout Options
        const options = {
          key: data.key_id,
          amount: data.amount,
          currency: data.currency,
          name: "Utkarsh Home",
          description: "Property Consultation / Service Payment",
          order_id: data.order_id,
          handler: async function (response) {
            try {
              const verifyRes = await API.post('/payments/verify', response, {
                headers: { Authorization: `Bearer ${token}` }
              });
              
              if (verifyRes.data.success) {
                navigate('/dashboard/payment-success', { 
                  state: { paymentId: response.razorpay_payment_id } 
                });
              }
            } catch (err) {
              setErrorMessage("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
          },
          theme: {
            color: "#EA580C",
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Payment initialization failed:", err);
      setErrorMessage(err.response?.data?.message || "Failed to start payment process.");
      setLoading(false);
    }
  };

  // Error view for invalid amounts
  if (amount <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 md:p-12 bg-[#1A1613] rounded-[2rem] border border-white/10 text-center">
          <p className="text-red-500 font-bold mb-4">No payment amount detected.</p>
          <button onClick={() => navigate(-1)} className="text-orange-500 underline font-black uppercase tracking-widest text-xs">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      {/* Top Navigation */}
      <div className="w-full max-w-xl flex justify-start mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Main Checkout Card */}
      <div className="w-full max-w-xl bg-[#1A1613] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight italic">
            Finalize <span className="text-orange-500">Payment</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest font-medium">
            Secure transaction via Razorpay
          </p>
        </div>

        {/* Pricing Box */}
        <div className="bg-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 mb-8 border border-white/5 text-center">
          <span className="text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">Total Payable</span>
          <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-3 flex items-center justify-center gap-1">
            <span className="text-orange-600 text-2xl md:text-3xl">₹</span>
            {Number(amount).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="text-red-400 text-sm font-bold bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-6 text-center animate-pulse">
            {errorMessage}
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-orange-600 py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.15em] hover:bg-orange-500 transition-all disabled:opacity-50 text-white shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm md:text-base">Processing...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={20} />
              <span className="text-sm md:text-base">Pay Now</span>
            </>
          )}
        </button>

        {/* Security Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-8 opacity-20 grayscale hover:opacity-40 transition-opacity">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-3 md:h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 md:h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 md:h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 md:h-4" />
        </div>
        
        <p className="mt-8 text-[9px] uppercase tracking-widest text-slate-600 text-center font-bold">
          128-bit SSL Encrypted Payment
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;