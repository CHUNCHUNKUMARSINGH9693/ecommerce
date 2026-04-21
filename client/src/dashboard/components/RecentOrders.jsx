import React from 'react';

const RecentOrders = () => {
  const orders = [
    { id: "2837", customer: "Blake Eotte", date: "19.02.2026", status: "Shipped", total: "$72.00" },
    { id: "282.03", customer: "Preost Vlapes", date: "19.02.2026", status: "Pending", total: "$29.00" },
    { id: "20808", customer: "Blace Stace", date: "17.02.2026", status: "Shipped", total: "$70.00" },
    { id: "32008", customer: "Blace Total", date: "19.02.2026", status: "Pending", total: "$20.00" },
  ];

  return (
    <div className="bg-[#1a1310] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black uppercase italic text-sm md:text-lg tracking-widest text-white">Recent Orders</h3>
        {/* Fixed syntax error here: changed > to &gt; */}
        <button className="text-[10px] font-black uppercase text-orange-500 tracking-widest hover:opacity-80">
          View All &gt;
        </button>
      </div>

      {/* MOBILE VIEW: Stacked Cards (Hidden on md screens and up) */}
      <div className="md:hidden space-y-3">
        {orders.map((order, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-orange-500 text-[11px] font-bold">#{order.id}</span>
              <span className={`px-2 py-1 rounded-md text-[8px] uppercase tracking-widest font-black ${
                order.status === 'Shipped' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-300 text-xs font-bold">{order.customer}</p>
                <p className="text-gray-500 text-[10px]">{order.date}</p>
              </div>
              <p className="text-white font-black text-sm">{order.total}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Table (Hidden on small screens) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-black">
              <th className="px-4">Order ID</th>
              <th className="px-4">Customer</th>
              <th className="px-4">Date</th>
              <th className="px-4">Status</th>
              <th className="px-4">Total</th>
            </tr>
          </thead>
          <tbody className="text-[11px] font-bold">
            {orders.map((order, i) => (
              <tr key={i} className="group">
                <td className="px-4 py-4 bg-white/5 rounded-l-2xl text-orange-500">{order.id}</td>
                <td className="px-4 py-4 bg-white/5 text-gray-300">{order.customer}</td>
                <td className="px-4 py-4 bg-white/5 text-gray-500">{order.date}</td>
                <td className="px-4 py-4 bg-white/5">
                  <span className={`px-3 py-1 rounded-lg text-[8px] uppercase tracking-widest font-black ${
                    order.status === 'Shipped' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 bg-white/5 rounded-r-2xl text-white font-black">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;