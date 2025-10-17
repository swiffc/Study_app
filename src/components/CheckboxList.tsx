import React, { useState } from 'react';
import { CheckboxItem } from '../types/workbook';
import { useWorkbookStore } from '../store/workbookStore';
import { Sparkles, Trophy, Zap } from 'lucide-react';

interface Props {
  items: CheckboxItem[];
}

export const CheckboxList: React.FC<Props> = ({ items }) => {
  const toggleCheckbox = useWorkbookStore(state => state.toggleCheckbox);
  const [justChecked, setJustChecked] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggle = (id: string) => {
    toggleCheckbox(id);
    setJustChecked(id);
    
    const item = items.find(i => i.id === id);
    if (item && !item.checked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    setTimeout(() => setJustChecked(null), 500);
  };

  if (items.length === 0) return null;

  const getMotivationalMessage = () => {
    if (progressPercent === 100) return "🎉 Amazing! You crushed it!";
    if (progressPercent >= 75) return "🔥 You're on fire!";
    if (progressPercent >= 50) return "💪 Halfway there, keep going!";
    if (progressPercent >= 25) return "🌟 Great start!";
    return "🚀 Let's do this!";
  };

  return (
    <div className="my-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-accent-500" />
            <h3 className="font-bold text-gray-900">Your Progress</h3>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-primary-600">{completedCount}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{totalCount}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-primary-500 via-accent-500 to-success-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          >
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-white animate-bounce" size={16} />
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 font-medium">{getMotivationalMessage()}</p>
      </div>

      {/* Checkbox Items */}
      <div className="space-y-2">
        {items.map(item => (
          <label
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
              item.checked 
                ? 'bg-gradient-to-r from-success-50 to-success-100 border-2 border-success-300' 
                : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-200'
            } ${justChecked === item.id ? 'scale-105 shadow-lg' : 'shadow-sm hover:shadow-md'}`}
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
                className="w-6 h-6 text-success-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-success-400 cursor-pointer transition-all"
              />
              {item.checked && (
                <Zap className="absolute -top-1 -right-1 text-accent-500 animate-pulse" size={14} />
              )}
            </div>
            
            <span className={`flex-1 transition-all ${
              item.checked 
                ? 'line-through text-gray-500 font-medium' 
                : 'text-gray-900 font-medium group-hover:text-primary-700'
            }`}>
              {item.text}
            </span>
            
            {item.checked && (
              <span className="text-2xl animate-bounce">✅</span>
            )}
          </label>
        ))}
      </div>

      {/* Completion Badge */}
      {progressPercent === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-accent-400 to-primary-500 rounded-xl text-center animate-pulse">
          <p className="text-white font-bold text-lg">🏆 MILESTONE ACHIEVED! 🏆</p>
          <p className="text-white/90 text-sm mt-1">You completed this section!</p>
        </div>
      )}
    </div>
  );
};
