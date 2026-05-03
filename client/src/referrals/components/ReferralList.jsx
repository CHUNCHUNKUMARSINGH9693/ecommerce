const ReferralList = ({ referrals = [] }) => {
  return (
    <div className="bg-[#1A1613] rounded-2xl shadow-sm border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-bold text-white">Recent Referrals</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 text-gray-400 text-sm">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Date Joined</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Reward</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {referrals.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{user.name}</td>
                <td className="p-4 text-gray-400 text-sm">{user.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-white">{user.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralList;