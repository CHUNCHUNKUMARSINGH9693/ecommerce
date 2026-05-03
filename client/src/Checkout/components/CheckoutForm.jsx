import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // 1. Ask backend for the clientSecret
      const { data } = await axios.post('/api/v1/payments/create-intent', {
        amount: totalAmount 
      });

      // 2. Confirm the payment with Stripe
      const payload = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
      } else {
        setError(null);
        alert("Success! Payment Received.");
        // Redirect user or clear cart here
      }
    } catch (err) {
      setError("Server connection failed.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-[#1A1613] rounded-lg border border-gray-800">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#ffffff',
              '::placeholder': { color: '#6B7280' },
            },
          }
        }} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button 
        disabled={loading}
        className="w-full py-3 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
      >
        {loading ? "Processing..." : `Pay $${totalAmount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;