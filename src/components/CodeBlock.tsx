import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Loader2, Copy, Check, Zap } from 'lucide-react';
import { CodeBlock as CodeBlockType } from '../types/workbook';
import { useWorkbookStore } from '../store/workbookStore';

interface Props {
  block: CodeBlockType;
}

export const CodeBlock: React.FC<Props> = ({ block }) => {
  const executeCode = useWorkbookStore(state => state.executeCode);
  const [copied, setCopied] = useState(false);

  const handleExecute = () => {
    executeCode(block.id);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(block.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm text-gray-300 font-mono font-semibold flex items-center gap-2">
            <Zap size={14} className="text-accent-400" />
            {block.language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
          
          {block.executable && (
            <button
              onClick={handleExecute}
              disabled={block.isRunning}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              {block.isRunning ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run Code
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Code */}
      <SyntaxHighlighter
        language={block.language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.95rem',
          padding: '1.5rem',
        }}
        showLineNumbers={true}
      >
        {block.code}
      </SyntaxHighlighter>
      
      {/* Output */}
      {(block.output || block.error) && (
        <div className={`px-6 py-4 border-t-2 ${
          block.error 
            ? 'bg-gradient-to-r from-red-900/30 to-red-800/30 border-red-600' 
            : 'bg-gradient-to-r from-success-900/30 to-success-800/30 border-success-600'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold uppercase tracking-wide ${
              block.error ? 'text-red-400' : 'text-success-400'
            }`}>
              {block.error ? '❌ Error' : '✅ Output'}
            </span>
          </div>
          <pre className={`text-sm font-mono whitespace-pre-wrap ${
            block.error ? 'text-red-200' : 'text-success-200'
          }`}>
            {block.error || block.output}
          </pre>
        </div>
      )}
    </div>
  );
};
