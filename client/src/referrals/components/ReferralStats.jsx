const ReferralStats = () => {
  const stats = [
    { label: 'Total Earnings', value: '₹2,500', color: 'text-green-600' },
    { label: 'Pending Rewards', value: '₹500', color: 'text-amber-600' },
    { label: 'Successful Invites', value: '12', color: 'text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
          <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ReferralStats;