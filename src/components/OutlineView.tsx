import React from 'react';
import { List } from 'lucide-react';
import { WorkbookSection } from '../types/workbook';
import { parseSections } from '../utils/parser';
import { useWorkbookStore } from '../store/workbookStore';

export const OutlineView: React.FC = () => {
  const currentWorkbook = useWorkbookStore(state => state.currentWorkbook);
  const [sections, setSections] = React.useState<WorkbookSection[]>([]);

  React.useEffect(() => {
    if (currentWorkbook) {
      setSections(parseSections(currentWorkbook.content));
    }
  }, [currentWorkbook]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // brief highlight for orientation
      const originalBg = (el as HTMLElement).style.backgroundColor;
      (el as HTMLElement).style.backgroundColor = 'rgba(252, 211, 77, 0.25)';
      setTimeout(() => {
        (el as HTMLElement).style.backgroundColor = originalBg;
      }, 600);
    }
  };

  if (!currentWorkbook || sections.length === 0) {
    return null;
  }

  return (
    <div className="w-72 bg-white border-l border-gray-200 h-screen overflow-y-auto shadow-xl">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-accent-50 to-primary-50">
        <h3 className="text-gray-900 font-bold flex items-center gap-2">
          <List size={20} className="text-accent-600" />
          Table of Contents
        </h3>
        <p className="text-xs text-gray-600 mt-1">Navigate your journey</p>
      </div>
      <div className="p-3">
        {sections.map(section => (
          <div
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="px-3 py-2 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 rounded-lg cursor-pointer text-gray-700 hover:text-gray-900 transition-all mb-1 group"
            style={{ paddingLeft: `${(section.level - 2) * 16 + 12}px` }}
          >
            <div className="text-sm font-medium truncate flex items-center gap-2">
              <span className="text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity">•</span>
              {section.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
