import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { QAPair } from '../types/workbook';
import { useWorkbookStore } from '../store/workbookStore';

interface Props {
  pair: QAPair;
}

export const QASection: React.FC<Props> = ({ pair }) => {
  const toggleAnswer = useWorkbookStore(state => state.toggleAnswer);

  return (
    <div className="my-6 border-2 border-primary-200 rounded-xl overflow-hidden bg-gradient-to-br from-white to-primary-50 shadow-md hover:shadow-lg transition-all">
      <button
        onClick={() => toggleAnswer(pair.id)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary-50/50 transition-colors"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-primary-500 p-2 rounded-lg mt-0.5 flex-shrink-0">
            {pair.isAnswerVisible ? (
              <ChevronDown size={18} className="text-white" />
            ) : (
              <ChevronRight size={18} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <span className="text-xs text-primary-600 font-bold uppercase tracking-wide">❓ Question</span>
            <p className="text-gray-900 mt-2 font-medium leading-relaxed">{pair.question}</p>
          </div>
        </div>
      </button>
      {pair.isAnswerVisible && (
        <div className="px-6 py-4 border-t-2 border-primary-200 bg-gradient-to-br from-success-50 to-white">
          <span className="text-xs text-success-700 font-bold uppercase tracking-wide">✅ Answer</span>
          <p className="text-gray-800 mt-2 leading-relaxed">{pair.answer}</p>
        </div>
      )}
    </div>
  );
};
