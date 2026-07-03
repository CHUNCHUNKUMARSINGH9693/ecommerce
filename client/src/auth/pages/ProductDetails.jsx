import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Tag, Box, DollarSign, Sparkles } from 'lucide-react';
import API from '../../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products/${id}`);
        setProduct(data?.data || null);
      } catch (err) {
        setError('Product could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-black text-slate-900">Product not found</h2>
          <p className="mt-2 text-slate-500">The selected product is unavailable right now.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} /> Go back
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = product.image || `${API.defaults.baseURL}/products/product-photo/${product._id}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="overflow-hidden rounded-[1.5rem] bg-slate-100 p-4">
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full min-h-[320px] w-full rounded-[1.2rem] object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/800x800/png?text=No+Image';
              }}
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                <Sparkles size={16} /> Featured product
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {product.description || 'A premium product from our collection.'}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  <Tag size={16} /> {product.category || 'General'}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  <Box size={16} /> Stock: {product.stock ?? 10}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                  <DollarSign size={16} /> ${Number(product.price || 0).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/login', { state: { from: `/product/${product._id}` } })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <ShoppingCart size={18} /> Add to cart
              </button>
              <button
                onClick={() => navigate('/')}
                className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
