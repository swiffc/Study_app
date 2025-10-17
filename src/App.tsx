import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { OutlineView } from './components/OutlineView';
import { Header } from './components/Header';
import { useWorkbookStore } from './store/workbookStore';

function App() {
  const { viewMode, sidebarOpen } = useWorkbookStore();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}
        
        <div className="flex-1 flex flex-col">
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
      </div>
    </div>
  );
}

export default App;
