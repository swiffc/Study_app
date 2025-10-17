import { Book, Target, Sparkles, Menu, Home } from 'lucide-react';
import { useWorkbookStore } from '../store/workbookStore';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { toggleSidebar, currentWorkbook } = useWorkbookStore();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-gradient-to-r from-primary-600 to-primary-700 border-b border-primary-800 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-white" />
        </button>
        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 cursor-pointer select-none group"
          title="Go to Dashboard"
        >
          <div className="bg-white/20 p-2 rounded-lg">
            <Book size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white group-hover:underline">ConsistentMind</h1>
            <p className="text-sm text-primary-100">Study • Manifest • Achieve</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
          title="Dashboard"
        >
          <Home size={16} className="text-white" />
          <span className="text-white text-sm font-medium">Dashboard</span>
        </button>
        {currentWorkbook && (
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <Sparkles size={16} className="text-accent-300" />
            <span className="text-white font-medium">{currentWorkbook.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <Target size={16} className="text-success-300" />
            <span className="text-white text-sm">Active Session</span>
          </div>
      </div>
    </header>
  );
};
