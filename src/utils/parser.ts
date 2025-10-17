import { WorkbookSection, CodeBlock, QAPair, CheckboxItem } from '../types/workbook';

export function parseSections(content: string): WorkbookSection[] {
  const sections: WorkbookSection[] = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{2,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      sections.push({
        id: `section-${index}`,
        title,
        level,
        line: index,
      });
    }
  });
  
  return sections;
}

export function parseCodeBlocks(content: string): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  const regex = /```(\w+)(?::run)?\n([\s\S]*?)```/g;
  let match;
  let blockIndex = 0;
  
  while ((match = regex.exec(content)) !== null) {
    const language = match[1];
    const code = match[2].trim();
    const executable = match[0].includes(':run');
    
    codeBlocks.push({
      id: `code-${blockIndex++}`,
      language,
      code,
      executable,
    });
  }
  
  return codeBlocks;
}

export function parseQAPairs(content: string): QAPair[] {
  const qaPairs: QAPair[] = [];
  const lines = content.split('\n');
  let currentQuestion: string | null = null;
  let currentAnswer: string | null = null;
  let pairIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('> Question:')) {
      currentQuestion = line.substring('> Question:'.length).trim();
    } else if (line.startsWith('< Answer:')) {
      currentAnswer = line.substring('< Answer:'.length).trim();
      
      if (currentQuestion && currentAnswer) {
        qaPairs.push({
          id: `qa-${pairIndex++}`,
          question: currentQuestion,
          answer: currentAnswer,
          isAnswerVisible: false,
        });
        currentQuestion = null;
        currentAnswer = null;
      }
    }
  }
  
  return qaPairs;
}

export function parseCheckboxes(content: string): CheckboxItem[] {
  const checkboxes: CheckboxItem[] = [];
  const lines = content.split('\n');
  let checkboxIndex = 0;
  
  lines.forEach((line, index) => {
    const uncheckedMatch = line.match(/^-\s+\[\s*\]\s+(.+)$/);
    const checkedMatch = line.match(/^-\s+\[x\]\s+(.+)$/i);
    
    if (uncheckedMatch) {
      checkboxes.push({
        id: `checkbox-${checkboxIndex++}`,
        text: uncheckedMatch[1].trim(),
        checked: false,
        line: index,
      });
    } else if (checkedMatch) {
      checkboxes.push({
        id: `checkbox-${checkboxIndex++}`,
        text: checkedMatch[1].trim(),
        checked: true,
        line: index,
      });
    }
  });
  
  return checkboxes;
}

export function updateCheckboxInContent(content: string, line: number, checked: boolean): string {
  const lines = content.split('\n');
  if (line >= 0 && line < lines.length) {
    const currentLine = lines[line];
    if (checked) {
      lines[line] = currentLine.replace(/^(-\s+)\[\s*\]/, '$1[x]');
    } else {
      lines[line] = currentLine.replace(/^(-\s+)\[x\]/i, '$1[ ]');
    }
  }
  return lines.join('\n');
}

export function highlightSearchResults(content: string, query: string): string {
  if (!query) return content;
  
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return content.replace(regex, '<mark>$1</mark>');
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
