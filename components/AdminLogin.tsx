
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호를 1234로 설정
    if (password === '1234') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8 text-center adobe-font">Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter Password"
              className={`w-full border-b ${error ? 'border-red-500' : 'border-black'} py-3 text-center text-xl focus:outline-none transition-colors tracking-widest`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-[10px] uppercase font-bold mt-2 text-center tracking-widest">
                Incorrect Password
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-[#EE3231] text-white font-bold uppercase tracking-widest py-4 hover:bg-black transition-colors rounded-sm"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-xs font-bold uppercase tracking-widest py-2 hover:underline transition-all"
            >
              Back to Site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
