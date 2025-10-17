import React from 'react';
import { useWorkbookStore } from '../store/workbookStore';

export const Editor: React.FC = () => {
  const { currentWorkbook, updateWorkbook } = useWorkbookStore();
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    if (currentWorkbook) {
      setContent(currentWorkbook.content);
    }
  }, [currentWorkbook]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleBlur = () => {
    if (currentWorkbook && content !== currentWorkbook.content) {
      updateWorkbook(content);
    }
  };

  if (!currentWorkbook) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <div className="text-6xl mb-4">✍️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Write?</h3>
        <p className="text-gray-500">Select or create a workbook to start your journey</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-accent-50">
        <h2 className="text-lg font-bold text-gray-900">{currentWorkbook.name}</h2>
        <p className="text-xs text-gray-600 mt-0.5">✍️ Write Mode</p>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        onBlur={handleBlur}
        className="flex-1 bg-white text-gray-900 p-8 font-mono text-base resize-none focus:outline-none leading-relaxed"
        placeholder="Start writing your manifestation journey...

# My Goals

## Today's Focus

> Question: What do I want to achieve?
< Answer: [Your vision here]

- [ ] Action step 1
- [ ] Action step 2"
        spellCheck={false}
      />
    </div>
  );
};
