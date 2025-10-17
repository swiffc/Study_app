import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useWorkbookStore } from '../store/workbookStore';

export const Layout = () => {
  const { sidebarOpen } = useWorkbookStore();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden pt-20">
        {sidebarOpen && <Sidebar />}
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
