import React from 'react';

const ReportTable = ({ reports = [] }) => {
  return (
    <div className="w-full bg-[#140a05] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Header with High Visibility */}
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-6 text-[11px] uppercase tracking-[0.2em] font-black text-orange-500">Date & Time</th>
              <th className="p-6 text-[11px] uppercase tracking-[0.2em] font-black text-orange-500">Ref ID</th>
              <th className="p-6 text-[11px] uppercase tracking-[0.2em] font-black text-orange-500">Service Details</th>
              <th className="p-6 text-[11px] uppercase tracking-[0.2em] font-black text-orange-500 text-right">Amount</th>
              <th className="p-6 text-[11px] uppercase tracking-[0.2em] font-black text-orange-500 text-center">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">
            {reports.map((item, index) => (
              <tr key={index} className="hover:bg-white/[0.03] transition-colors group">
                <td className="p-6">
                  <p className="text-sm font-bold text-gray-100">{item.date}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.time}</p>
                </td>
                <td className="p-6">
                  <span className="font-mono text-xs text-orange-200/60 bg-orange-900/20 px-2 py-1 rounded">
                    #{item.id}
                  </span>
                </td>
                <td className="p-6">
                  <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </td>
                <td className="p-6 text-right">
                  <span className="text-sm font-black text-white">₹{item.amount}</span>
                </td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg 
                    ${item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5' : 
                      item.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;