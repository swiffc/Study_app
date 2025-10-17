import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, Download, Upload, BookOpen, ChevronDown } from 'lucide-react';
import { useWorkbookStore } from '../store/workbookStore';
import { exportWorkbook, importWorkbook, saveWorkbook } from '../utils/database';
import { UNSTOPPABLE_MIND_WORKBOOK } from '../utils/exampleWorkbooks';

export const Sidebar: React.FC = () => {
  const { workbooks, currentWorkbook, createWorkbook, loadWorkbook, deleteWorkbook, loadWorkbooks } = useWorkbookStore();
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showExamples, setShowExamples] = React.useState(false);

  React.useEffect(() => {
    loadWorkbooks();
  }, [loadWorkbooks]);

  const handleCreate = () => {
    const name = prompt('Enter workbook name:');
    if (name) {
      createWorkbook(name).then(() => {
        const store = useWorkbookStore.getState();
        if (store.currentWorkbook) {
          navigate(`/workbook/${store.currentWorkbook.id}`);
        }
      });
    }
  };

  // Mark button for dashboard to find
  const createButtonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (createButtonRef.current) {
      createButtonRef.current.setAttribute('data-create-workbook', 'true');
    }
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this workbook?')) {
      deleteWorkbook(id);
    }
  };

  const handleExport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentWorkbook) {
      await exportWorkbook(currentWorkbook);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const workbook = await importWorkbook(file);
      await createWorkbook(workbook.name);
      // Update content after creation
      const store = useWorkbookStore.getState();
      if (store.currentWorkbook) {
        await store.updateWorkbook(workbook.content);
        navigate(`/workbook/${store.currentWorkbook.id}`);
      }
    }
  };

  const handleLoadExample = async (exampleWorkbook: any) => {
    // Check if example already exists
    const exists = workbooks.some(wb => wb.id === exampleWorkbook.id);
    
    if (exists) {
      // Just load it
      await loadWorkbook(exampleWorkbook.id);
      navigate(`/workbook/${exampleWorkbook.id}`);
    } else {
      // Save and load
      await saveWorkbook(exampleWorkbook);
      await loadWorkbooks();
      await loadWorkbook(exampleWorkbook.id);
      navigate(`/workbook/${exampleWorkbook.id}`);
    }
    setShowExamples(false);
  };

  const handleLoadTradingCoach = async () => {
    // Read the workbook file and create it
    try {
      const response = await fetch('/workbooks/daily-trading-coach.workbook');
      const content = await response.text();
      
      const workbook = {
        id: 'example-trading-coach',
        name: 'Daily Trading Coach - 101 Lessons',
        content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const exists = workbooks.some(wb => wb.id === workbook.id);
      if (exists) {
        await loadWorkbook(workbook.id);
        navigate(`/workbook/${workbook.id}`);
      } else {
        await saveWorkbook(workbook);
        await loadWorkbooks();
        await loadWorkbook(workbook.id);
        navigate(`/workbook/${workbook.id}`);
      }
      setShowExamples(false);
    } catch (error) {
      console.error('Failed to load Trading Coach workbook:', error);
    }
  };

  const handleLoadDoHardThings = async () => {
    try {
      const response = await fetch('/workbooks/do-hard-things.workbook');
      const content = await response.text();
      const workbook = {
        id: 'example-do-hard-things',
        name: 'How To Do Hard Things - Workbook Guide',
        content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const exists = workbooks.some(wb => wb.id === workbook.id);
      if (exists) {
        await loadWorkbook(workbook.id);
        navigate(`/workbook/${workbook.id}`);
      } else {
        await saveWorkbook(workbook);
        await loadWorkbooks();
        await loadWorkbook(workbook.id);
        navigate(`/workbook/${workbook.id}`);
      }
      setShowExamples(false);
    } catch (error) {
      console.error('Failed to load Do Hard Things workbook:', error);
    }
  };

  return (
    <div className="w-72 bg-white h-screen flex flex-col border-r border-gray-200 shadow-xl">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-primary-50 to-accent-50">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText size={20} className="text-primary-600" />
          My Workbooks
        </h2>
        <p className="text-xs text-gray-600 mt-1">Study guides & manifestation tools</p>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-2 mb-3">
          <button
            ref={createButtonRef}
            onClick={handleCreate}
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            Create New
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white hover:bg-gray-50 border-2 border-gray-300 px-3 py-2.5 rounded-lg shadow-sm"
            title="Import"
          >
            <Upload size={18} className="text-gray-700" />
          </button>
          {currentWorkbook && (
            <button
              onClick={handleExport}
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 px-3 py-2.5 rounded-lg shadow-sm"
              title="Export"
            >
              <Download size={18} className="text-gray-700" />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium shadow-md transition-all"
          >
            <BookOpen size={16} />
            Example Workbooks
            <ChevronDown size={14} className={`transition-transform ${showExamples ? 'rotate-180' : ''}`} />
          </button>
          
          {showExamples && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden max-h-96 overflow-y-auto">
              <button
                onClick={() => handleLoadExample(UNSTOPPABLE_MIND_WORKBOOK)}
                className="w-full px-4 py-3 text-left text-sm hover:bg-primary-50 flex items-center gap-3 transition-colors"
              >
                <div className="bg-primary-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-primary-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Unstoppable Mind</div>
                  <div className="text-xs text-gray-500">Mental resilience training</div>
                </div>
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/workbooks/compound-effect.workbook');
                    const content = await response.text();
                    const workbook = {
                      id: 'example-compound-effect',
                      name: 'The Compound Effect — Action Workbook',
                      content,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                    };
                    const exists = workbooks.some(wb => wb.id === workbook.id);
                    if (exists) {
                      await loadWorkbook(workbook.id);
                      navigate(`/workbook/${workbook.id}`);
                    } else {
                      await saveWorkbook(workbook);
                      await loadWorkbooks();
                      await loadWorkbook(workbook.id);
                      navigate(`/workbook/${workbook.id}`);
                    }
                    setShowExamples(false);
                  } catch (error) {
                    console.error('Failed to load Compound Effect workbook:', error);
                  }
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-orange-50 flex items-center gap-3 border-t border-gray-100 transition-colors"
              >
                <div className="bg-orange-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-orange-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">The Compound Effect</div>
                  <div className="text-xs text-gray-500">Small choices, big results</div>
                </div>
              </button>
              <button
                onClick={handleLoadDoHardThings}
                className="w-full px-4 py-3 text-left text-sm hover:bg-amber-50 flex items-center gap-3 border-t border-gray-100 transition-colors"
              >
                <div className="bg-amber-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-amber-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">How To Do Hard Things</div>
                  <div className="text-xs text-gray-500">Companion workbook guide</div>
                </div>
              </button>
              <button
                onClick={handleLoadTradingCoach}
                className="w-full px-4 py-3 text-left text-sm hover:bg-accent-50 flex items-center gap-3 border-t border-gray-100 transition-colors"
              >
                <div className="bg-accent-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-accent-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Daily Trading Coach</div>
                  <div className="text-xs text-gray-500">101 psychology lessons</div>
                </div>
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/workbooks/manifestation-master.workbook');
                    const content = await response.text();
                    const workbook = {
                      id: 'example-manifestation',
                      name: '🌟 Manifestation Master',
                      content,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                    };
                    const exists = workbooks.some(wb => wb.id === workbook.id);
                    if (exists) {
                      await loadWorkbook(workbook.id);
                    } else {
                      await saveWorkbook(workbook);
                      await loadWorkbooks();
                      await loadWorkbook(workbook.id);
                    }
                    setShowExamples(false);
                  } catch (error) {
                    console.error('Failed to load Manifestation Master:', error);
                  }
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-purple-50 flex items-center gap-3 border-t border-gray-100 transition-colors"
              >
                <div className="bg-purple-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-purple-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">🌟 Manifestation Master</div>
                  <div className="text-xs text-gray-500">Create your reality</div>
                </div>
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/workbooks/key-principles-summary.workbook');
                    const content = await response.text();
                    const workbook = {
                      id: 'example-key-principles',
                      name: '🔑 Key Principles Summary',
                      content,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                    };
                    const exists = workbooks.some(wb => wb.id === workbook.id);
                    if (exists) {
                      await loadWorkbook(workbook.id);
                    } else {
                      await saveWorkbook(workbook);
                      await loadWorkbooks();
                      await loadWorkbook(workbook.id);
                    }
                    setShowExamples(false);
                  } catch (error) {
                    console.error('Failed to load Key Principles:', error);
                  }
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-green-50 flex items-center gap-3 border-t border-gray-100 transition-colors"
              >
                <div className="bg-green-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-green-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">🔑 Key Principles</div>
                  <div className="text-xs text-gray-500">Essential insights summary</div>
                </div>
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/workbooks/trading-psychology-lab.workbook');
                    const content = await response.text();
                    const workbook = {
                      id: 'example-trading-psychology-lab',
                      name: '📊 Trading Psychology Lab',
                      content,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                    };
                    const exists = workbooks.some(wb => wb.id === workbook.id);
                    if (exists) {
                      await loadWorkbook(workbook.id);
                    } else {
                      await saveWorkbook(workbook);
                      await loadWorkbooks();
                      await loadWorkbook(workbook.id);
                    }
                    setShowExamples(false);
                  } catch (error) {
                    console.error('Failed to load Trading Psychology Lab:', error);
                  }
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex items-center gap-3 border-t border-gray-100 transition-colors"
              >
                <div className="bg-blue-100 p-1.5 rounded">
                  <BookOpen size={14} className="text-blue-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">📊 Trading Psychology Lab</div>
                  <div className="text-xs text-gray-500">Master trader wisdom</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {workbooks.map(workbook => (
          <div
            key={workbook.id}
            onClick={async () => {
              await loadWorkbook(workbook.id);
              navigate(`/workbook/${workbook.id}`);
            }}
            className={`mx-2 my-1.5 p-4 cursor-pointer rounded-lg hover:shadow-md transition-all flex items-center justify-between group ${
              currentWorkbook?.id === workbook.id 
                ? 'bg-gradient-to-r from-primary-100 to-accent-100 border-2 border-primary-300 shadow-md' 
                : 'bg-white border border-gray-200 hover:border-primary-200'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className={`font-semibold truncate ${
                currentWorkbook?.id === workbook.id ? 'text-primary-900' : 'text-gray-900'
              }`}>
                {workbook.name}
              </div>
              <div className={`text-xs mt-1 flex items-center gap-2 ${
                currentWorkbook?.id === workbook.id ? 'text-primary-700' : 'text-gray-500'
              }`}>
                <span>📅 {new Date(workbook.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button
              onClick={(e) => handleDelete(workbook.id, e)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {workbooks.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">📚</div>
            <div className="text-gray-600 font-medium">No workbooks yet</div>
            <div className="text-sm text-gray-500 mt-1">Create one to start your journey!</div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".workbook,.md"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
};
