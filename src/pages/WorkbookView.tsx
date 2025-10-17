import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useWorkbookStore } from '../store/workbookStore';
import { saveWorkbook } from '../utils/database';
import { Toolbar } from '../components/Toolbar';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';
import { OutlineView } from '../components/OutlineView';

const WorkbookView = () => {
  const { id } = useParams<{ id: string }>();
  const { viewMode, loadWorkbook, currentWorkbook, loadWorkbooks } = useWorkbookStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkbookData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Try to load from IndexedDB first
        await loadWorkbook(id);
        
        // If not found and it's an example workbook, load from file
        if (!currentWorkbook && id.startsWith('example-')) {
          const fileMap: Record<string, string> = {
            'example-unstoppable-mind': 'unstoppable-mind-part1.workbook',
            'example-manifestation': 'manifestation-master.workbook',
            'example-key-principles': 'key-principles-summary.workbook',
            'example-trading-psychology-lab': 'trading-psychology-lab.workbook',
            'example-do-hard-things': 'do-hard-things.workbook',
            'example-compound-effect': 'compound-effect.workbook',
          };
          
          const filename = fileMap[id];
          if (filename) {
            const response = await fetch(`/workbooks/${filename}`);
            if (!response.ok) throw new Error('Failed to load workbook file');
            
            const content = await response.text();
            const workbook = {
              id,
              name: id.replace('example-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              content,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            
            await saveWorkbook(workbook);
            await loadWorkbooks();
            await loadWorkbook(id);
          }
        }
      } catch (err) {
        console.error('Error loading workbook:', err);
        setError('Failed to load workbook. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadWorkbookData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading workbook...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentWorkbook) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Workbook not found</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-20 md:pt-20">
      <Toolbar />
      
      <div className="flex-1 flex overflow-hidden">
        {viewMode === 'edit' && <Editor />}
        
        {viewMode === 'preview' && (
          <>
            <Preview />
            <OutlineView />
          </>
        )}
        
        {viewMode === 'split' && (
          <>
            <Editor />
            <div className="w-px bg-gradient-to-b from-primary-200 via-accent-200 to-primary-200" />
            <Preview />
            <OutlineView />
          </>
        )}
      </div>
    </div>
  );
};

export default WorkbookView;
