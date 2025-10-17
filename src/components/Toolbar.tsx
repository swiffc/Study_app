import React from 'react';
import { Eye, Edit, SplitSquareHorizontal, Search } from 'lucide-react';
import { useWorkbookStore } from '../store/workbookStore';
import { ViewMode } from '../types/workbook';

export const Toolbar: React.FC = () => {
  const { viewMode, setViewMode, searchQuery, setSearchQuery } = useWorkbookStore();
  const viewModes: { mode: ViewMode; icon: typeof Eye; label: string }[] = [
    { mode: 'preview', icon: Eye, label: 'Read' },
    { mode: 'edit', icon: Edit, label: 'Write' },
    { mode: 'split', icon: SplitSquareHorizontal, label: 'Both' },
  ];

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {viewModes.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 font-medium text-sm transition-all ${
                viewMode === mode
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your workbook..."
            className="pl-10 pr-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none w-64 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
