import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useWorkbookStore } from '../store/workbookStore';
// import { parseCodeBlocks, parseQAPairs, parseCheckboxes } from '../utils/parser';
import { CodeBlock } from './CodeBlock';
import { QASection } from './QASection';
import { CheckboxList } from './CheckboxList';
import { StatsCard } from './StatsCard';
import { AnimatedQuote } from './AnimatedQuote';

export const Preview: React.FC = () => {
  const { currentWorkbook, codeBlocks, qaPairs, checkboxes } = useWorkbookStore();

  if (!currentWorkbook) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <div className="text-6xl mb-4">📖</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Nothing to Read Yet</h3>
        <p className="text-gray-500">Create or select a workbook to begin</p>
      </div>
    );
  }

  // Split content into sections
  const lines = currentWorkbook.content.split('\n');
  const renderedContent: React.ReactNode[] = [];
  let currentSection: string[] = [];
  let inCodeBlock = false;
  let codeBlockIndex = 0;
  let qaIndex = 0;

  const flushSection = () => {
    if (currentSection.length > 0) {
      const sectionContent = currentSection.join('\n');
      renderedContent.push(
        <ReactMarkdown
          key={`md-${renderedContent.length}`}
          remarkPlugins={[remarkGfm]}
          className="prose prose-invert max-w-none"
        >
          {sectionContent}
        </ReactMarkdown>
      );
      currentSection = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        flushSection();
        inCodeBlock = true;
        
        // Find matching code block
        const codeBlocksArray = Array.from(codeBlocks.values());
        if (codeBlockIndex < codeBlocksArray.length) {
          renderedContent.push(
            <CodeBlock key={`code-${codeBlockIndex}`} block={codeBlocksArray[codeBlockIndex]} />
          );
          codeBlockIndex++;
        }
        
        // Skip to end of code block
        while (i < lines.length && !lines[i].match(/^```\s*$/)) {
          i++;
        }
        inCodeBlock = false;
        continue;
      }
    }

    // Insert anchors for headings to enable Outline navigation
    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
    if (headingMatch) {
      // Finish previous section before a new heading
      flushSection();
      // Insert an anchor that matches parseSections id: section-<lineIndex>
      renderedContent.push(
        <span
          key={`anchor-${i}`}
          id={`section-${i}`}
          className="block h-0 scroll-mt-28 md:scroll-mt-32"
        />
      );
      // fall through to push the heading line into the new section
    }

    // Handle Q&A
    if (line.startsWith('> Question:')) {
      flushSection();
      const qaPairsArray = Array.from(qaPairs.values());
      if (qaIndex < qaPairsArray.length) {
        renderedContent.push(
          <QASection key={`qa-${qaIndex}`} pair={qaPairsArray[qaIndex]} />
        );
        qaIndex++;
      }
      // Skip answer line
      if (i + 1 < lines.length && lines[i + 1].startsWith('< Answer:')) {
        i++;
      }
      continue;
    }

    // Skip standalone answer lines
    if (line.startsWith('< Answer:')) {
      continue;
    }

    currentSection.push(line);
  }

  flushSection();

  // Add checkboxes at the end if any
  const checkboxesArray = Array.from(checkboxes.values());
  if (checkboxesArray.length > 0) {
    renderedContent.push(
      <CheckboxList key="checkboxes" items={checkboxesArray} />
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
      {/* Hero Header */}
      <div className="relative p-8 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-semibold mb-3">
            📚 INTERACTIVE WORKBOOK
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 drop-shadow-lg">
            {currentWorkbook.name}
          </h1>
          <p className="text-lg text-white/90 font-medium">
            ✨ Read, Learn, Interact & Transform Your Life
          </p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="max-w-4xl mx-auto px-8 -mt-8">
        <StatsCard />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-8 text-gray-900">
        {renderedContent}
        
        {/* Motivational Footer */}
        <div className="mt-12 mb-8">
          <AnimatedQuote 
            text="The journey of a thousand miles begins with a single step. You're already on your way!"
            author="Lao Tzu (adapted)"
          />
        </div>
      </div>
    </div>
  );
};
