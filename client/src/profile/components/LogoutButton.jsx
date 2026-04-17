import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ✅ Fixed path
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/5">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 py-4 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all border border-rose-600/20 shadow-lg shadow-rose-900/10 group"
      >
        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
        Close Session
      </button>
      
      <p className="mt-4 text-center text-[9px] text-gray-600 uppercase font-black tracking-[0.3em]">
        Utkarsh Home Security Protocol Active
      </p>
    </div>
  );
};

export default LogoutButton;