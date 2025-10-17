import { Book, Sparkles, Menu, Home, Zap } from 'lucide-react';
import { useWorkbookStore } from '../store/workbookStore';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { toggleSidebar, currentWorkbook } = useWorkbookStore();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-6 h-full flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <Menu size={24} className="text-gray-700 group-hover:text-primary-600 transition-colors" />
          </button>
          
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="Go to Dashboard"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 p-2.5 rounded-2xl shadow-lg">
                <Book size={26} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ConsistentMind
              </h1>
              <p className="text-xs font-medium text-gray-500">Study • Manifest • Achieve</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition-all duration-200 group"
            title="Dashboard"
          >
            <Home size={18} className="text-gray-600 group-hover:text-primary-600 transition-colors" />
            <span className="text-gray-700 text-sm font-semibold">Dashboard</span>
          </button>
          
          {currentWorkbook && (
            <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-accent-50 to-purple-50 px-4 py-2.5 rounded-xl border border-accent-200">
              <Sparkles size={16} className="text-accent-600" />
              <span className="text-gray-900 font-semibold text-sm max-w-xs truncate">
                {currentWorkbook.name}
              </span>
            </div>
          )}
          
          <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-success-50 to-emerald-50 px-4 py-2.5 rounded-xl border border-success-200">
            <Zap size={16} className="text-success-600" />
            <span className="text-success-700 text-sm font-semibold">Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};
