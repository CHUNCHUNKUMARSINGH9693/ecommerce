import React, { useState } from 'react';
import axios from 'axios';

// Razorpay loads checkout via global `Razorpay` SDK.
// Ensure razorpay script is available in your index.html.
const CheckoutForm = ({ totalAmount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loadRazorpayScript();

      // 1) Create Razorpay order on the backend
      const { data } = await axios.post('/api/v1/payments/razorpay-order', {
        amount: totalAmount,
        currency: 'INR',
      });

      const { order_id, key_id } = data;
      if (!order_id || !key_id) {
        throw new Error('Invalid server response for Razorpay order');
      }

      // 2) Open Razorpay checkout
      const options = {
        key: key_id,
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'E-Commerce Admin',
        order_id,
        handler: async function (response) {
          try {
            // 3) Verify payment on backend
            const verifyRes = await axios.post('/api/v1/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data?.success) {
              alert('Success! Payment Received.');
              setError(null);
            } else {
              setError(verifyRes.data?.message || 'Payment verification failed');
            }
          } catch (err) {
            setError(err.response?.data?.message || 'Payment verification error');
          }
        },
        prefill: {
          // Replace with real user details if you have them in state
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#FF6B00',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        setError(resp.error?.description || 'Payment failed');
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        disabled={loading}
        className="w-full py-3 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
      >
        {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default CheckoutForm;

