import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useWorkbookStore } from '../store/workbookStore';

export const Layout = () => {
  const { sidebarOpen } = useWorkbookStore();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
