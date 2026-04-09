import React from "react";

const ReportRow = ({ row }) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-medium">{row.id}</td>
      <td className="px-6 py-4 text-slate-600 text-sm">{row.date}</td>
      <td className="px-6 py-4">
        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">
          {row.type}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {row.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-bold text-slate-800">{row.amount}</td>
    </tr>
  );
};


export default ReportRow;