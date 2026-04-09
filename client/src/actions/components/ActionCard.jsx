import React from 'react';

const ActionCard = ({ title, description, icon, bgColor, iconColor, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md hover:border-indigo-100 transition-all group"
    >
      <div className={`p-3 rounded-xl ${bgColor} ${iconColor} mb-4 group-hover:scale-110 transition-transform duration-200 text-2xl`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
    </button>
  );
};

export default ActionCard;