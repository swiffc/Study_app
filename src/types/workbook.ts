export interface Workbook {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface WorkbookSection {
  id: string;
  title: string;
  level: number;
  line: number;
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  executable: boolean;
  output?: string;
  error?: string;
  isRunning?: boolean;
}

export interface QAPair {
  id: string;
  question: string;
  answer: string;
  isAnswerVisible: boolean;
}

export interface CheckboxItem {
  id: string;
  text: string;
  checked: boolean;
  line: number;
}

export interface HabitTracker {
  id: string;
  name: string;
  entries: HabitEntry[];
}

export interface HabitEntry {
  date: string;
  completed: boolean;
}

export type ViewMode = 'edit' | 'preview' | 'split';

export interface WorkbookState {
  workbooks: Workbook[];
  currentWorkbook: Workbook | null;
  viewMode: ViewMode;
  sidebarOpen: boolean;
  searchQuery: string;
  codeBlocks: Map<string, CodeBlock>;
  qaPairs: Map<string, QAPair>;
  checkboxes: Map<string, CheckboxItem>;
  
  // Actions
  createWorkbook: (name: string) => Promise<void>;
  loadWorkbook: (id: string) => Promise<void>;
  updateWorkbook: (content: string) => Promise<void>;
  deleteWorkbook: (id: string) => Promise<void>;
  setViewMode: (mode: ViewMode) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  executeCode: (blockId: string) => Promise<void>;
  toggleAnswer: (qaId: string) => void;
  toggleCheckbox: (checkboxId: string) => void;
  loadWorkbooks: () => Promise<void>;
}
