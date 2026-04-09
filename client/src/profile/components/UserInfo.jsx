import React from 'react';

const UserInfo = () => {
  const user = {
    name: "Chunchun Kumar Singh",
    email: "chunchun@example.com",
    role: "Full Stack Developer",
    joined: "October 2025"
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-inner">
        {user.name.charAt(0)}
      </div>
      
      <div className="text-center md:text-left space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
        <p className="text-indigo-600 font-medium text-sm">{user.role}</p>
        <div className="flex flex-col gap-1 mt-3">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            <span>📧</span> {user.email}
          </p>
          <p className="text-slate-400 text-xs italic">
            Member since {user.joined}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;