import { create } from 'zustand';
import { WorkbookState, Workbook, CodeBlock, QAPair } from '../types/workbook';
import {
  saveWorkbook,
  getWorkbook,
  getAllWorkbooks,
  deleteWorkbook as deleteWorkbookDB,
} from '../utils/database';
import { parseCodeBlocks, parseQAPairs, parseCheckboxes, updateCheckboxInContent } from '../utils/parser';
import { executeCode } from '../utils/codeExecutor';

export const useWorkbookStore = create<WorkbookState>((set, get) => ({
  workbooks: [],
  currentWorkbook: null,
  viewMode: 'preview',
  sidebarOpen: true,
  searchQuery: '',
  codeBlocks: new Map(),
  qaPairs: new Map(),
  checkboxes: new Map(),

  createWorkbook: async (name: string) => {
    const workbook: Workbook = {
      id: crypto.randomUUID(),
      name,
      content: `# ${name}\n\n## Getting Started\n\nStart writing your workbook here...`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await saveWorkbook(workbook);
    set(state => ({
      workbooks: [...state.workbooks, workbook],
      currentWorkbook: workbook,
    }));
  },

  loadWorkbook: async (id: string) => {
    const workbook = await getWorkbook(id);
    if (workbook) {
      const codeBlocks = parseCodeBlocks(workbook.content);
      const qaPairs = parseQAPairs(workbook.content);
      const checkboxes = parseCheckboxes(workbook.content);
      
      set({
        currentWorkbook: workbook,
        codeBlocks: new Map(codeBlocks.map(block => [block.id, block])),
        qaPairs: new Map(qaPairs.map(pair => [pair.id, pair])),
        checkboxes: new Map(checkboxes.map(checkbox => [checkbox.id, checkbox])),
      });
    }
  },

  updateWorkbook: async (content: string) => {
    const { currentWorkbook } = get();
    if (!currentWorkbook) return;
    
    const updatedWorkbook: Workbook = {
      ...currentWorkbook,
      content,
      updatedAt: Date.now(),
    };
    
    await saveWorkbook(updatedWorkbook);
    
    const codeBlocks = parseCodeBlocks(content);
    const qaPairs = parseQAPairs(content);
    const checkboxes = parseCheckboxes(content);
    
    set({
      currentWorkbook: updatedWorkbook,
      codeBlocks: new Map(codeBlocks.map(block => [block.id, block])),
      qaPairs: new Map(qaPairs.map(pair => [pair.id, pair])),
      checkboxes: new Map(checkboxes.map(checkbox => [checkbox.id, checkbox])),
    });
  },

  deleteWorkbook: async (id: string) => {
    await deleteWorkbookDB(id);
    set(state => ({
      workbooks: state.workbooks.filter(wb => wb.id !== id),
      currentWorkbook: state.currentWorkbook?.id === id ? null : state.currentWorkbook,
    }));
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  toggleSidebar: () => {
    set(state => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  executeCode: async (blockId: string) => {
    const { codeBlocks } = get();
    const block = codeBlocks.get(blockId);
    
    if (!block || !block.executable) return;
    
    // Set running state
    const updatedBlock: CodeBlock = { ...block, isRunning: true, output: undefined, error: undefined };
    codeBlocks.set(blockId, updatedBlock);
    set({ codeBlocks: new Map(codeBlocks) });
    
    // Execute code
    const result = await executeCode(block.language, block.code);
    
    // Update with results
    const finalBlock: CodeBlock = {
      ...block,
      isRunning: false,
      output: result.output,
      error: result.error,
    };
    codeBlocks.set(blockId, finalBlock);
    set({ codeBlocks: new Map(codeBlocks) });
  },

  toggleAnswer: (qaId: string) => {
    const { qaPairs } = get();
    const pair = qaPairs.get(qaId);
    
    if (pair) {
      const updatedPair: QAPair = { ...pair, isAnswerVisible: !pair.isAnswerVisible };
      qaPairs.set(qaId, updatedPair);
      set({ qaPairs: new Map(qaPairs) });
    }
  },

  toggleCheckbox: async (checkboxId: string) => {
    const { checkboxes, currentWorkbook } = get();
    const checkbox = checkboxes.get(checkboxId);
    
    if (checkbox && currentWorkbook) {
      const newChecked = !checkbox.checked;
      const updatedContent = updateCheckboxInContent(
        currentWorkbook.content,
        checkbox.line,
        newChecked
      );
      
      await get().updateWorkbook(updatedContent);
    }
  },

  loadWorkbooks: async () => {
    const workbooks = await getAllWorkbooks();
    set({ workbooks });
  },
}));
