const OverviewCard = ({ title, value, sub, color }) => {
  const themes = {
    indigo: "border-indigo-500 text-indigo-600",
    emerald: "border-emerald-500 text-emerald-600",
    amber: "border-amber-500 text-amber-600",
    rose: "border-rose-500 text-rose-600",
  };

  return (
    <div className={`bg-white p-4 rounded-2xl shadow-sm border-b-4 ${themes[color]}`}>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-xl font-black text-gray-900 mt-1">{value}</p>
      <p className="text-gray-400 text-[10px] mt-1">{sub}</p>
    </div>
  );
};

export default OverviewCard;