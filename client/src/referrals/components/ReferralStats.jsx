const ReferralStats = ({ stats }) => {
  const cards = [
    { label: 'Total Earnings', value: `₹${stats.totalEarnings || 0}`, color: 'text-emerald-400' },
    { label: 'Pending Rewards', value: `${stats.pendingReferrals || 0}`, color: 'text-amber-400' },
    { label: 'Successful Invites', value: `${stats.successfulReferrals || 0}`, color: 'text-sky-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((stat, index) => (
        <div key={index} className="bg-[#1A1613] p-6 rounded-2xl shadow-sm border border-white/10">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{stat.label}</p>
          <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ReferralStats;