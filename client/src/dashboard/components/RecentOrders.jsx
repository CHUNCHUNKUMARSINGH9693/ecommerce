import React from 'react';

const RecentOrders = () => {
  const orders = [
    { id: "2837", customer: "Blake Eotte", date: "19.02.2026", status: "Shipped", total: "$72.00" },
    { id: "282.03", customer: "Preost Vlapes", date: "19.02.2026", status: "Pending", total: "$29.00" },
    { id: "20808", customer: "Blace Stace", date: "17.02.2026", status: "Shipped", total: "$70.00" },
    { id: "32008", customer: "Blace Total", date: "19.02.2026", status: "Pending", total: "$20.00" },
  ];

  return (
    <div className="bg-[#110C0A] border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-black uppercase italic text-lg md:text-xl tracking-tighter text-white">
          Recent Orders <span className="text-orange-600">.</span>
        </h3>
        <button className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] hover:text-white transition-colors group">
          View All 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {orders.map((order, i) => (
          <div key={i} className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-orange-500 text-xs font-black tracking-widest">#{order.id}</span>
              <span className={`px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest ${
                order.status === 'Shipped' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white text-sm font-black uppercase tracking-tight italic">{order.customer}</p>
                <p className="text-white/30 text-[10px] font-bold mt-1 uppercase">{order.date}</p>
              </div>
              <p className="text-white font-black text-lg italic">{order.total}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black italic">
              <th className="px-6 pb-2">Order ID</th>
              <th className="px-6 pb-2">Customer</th>
              <th className="px-6 pb-2">Date</th>
              <th className="px-6 pb-2">Status</th>
              <th className="px-6 pb-2">Total</th>
            </tr>
          </thead>
          <tbody className="text-xs font-bold uppercase tracking-tight">
            {orders.map((order, i) => (
              <tr key={i} className="group cursor-pointer">
                <td className="px-6 py-6 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors rounded-l-[1.5rem] text-orange-500 font-black italic">
                  {order.id}
                </td>
                <td className="px-6 py-6 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors text-white font-black italic tracking-tighter">
                  {order.customer}
                </td>
                <td className="px-6 py-6 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors text-white/40">
                  {order.date}
                </td>
                <td className="px-6 py-6 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border ${
                    order.status === 'Shipped' 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : 'bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-6 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors rounded-r-[1.5rem] text-white font-black text-sm italic">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;