const AccountHealth = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 mb-6">Account Health</h3>
    <div className="flex flex-col items-center">
      {/* Circular Progress (CSS-based) */}
      <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-[10px] border-rose-100 border-t-rose-500 -rotate-45">
        <span className="text-2xl font-black text-gray-800 rotate-45">0%</span>
      </div>
      <p className="mt-4 font-bold text-rose-500 uppercase tracking-tighter">Poor Status</p>
      <p className="text-gray-400 text-center text-xs mt-2 px-4">
        Your success rate is currently below the platform standard.
      </p>
    </div>
  </div>
);

export default AccountHealth;