const ReferralList = () => {
  const referrals = [
    { id: 1, name: 'Rahul Sharma', date: 'Oct 24, 2025', status: 'Completed', reward: '₹200' },
    { id: 2, name: 'Priya Verma', date: 'Oct 22, 2025', status: 'Pending', reward: '₹200' },
    { id: 3, name: 'Amit Singh', date: 'Oct 15, 2025', status: 'Completed', reward: '₹200' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">Recent Referrals</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Date Joined</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Reward</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {referrals.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{user.name}</td>
                <td className="p-4 text-slate-500 text-sm">{user.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-slate-700">{user.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralList;