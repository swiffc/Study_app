import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './routes'
import { ErrorBoundary } from './shared/components/ErrorBoundary'
import './index.css'

// Initialize database (inline to avoid import error)
const initDatabase = async () => {
  return new Promise<void>((resolve) => {
    const request = indexedDB.open('WorkbookDB', 1);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('workbooks')) {
        db.createObjectStore('workbooks', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve();
    request.onerror = () => resolve(); // Don't block on error
  });
};

// Initialize database
initDatabase()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </React.StrictMode>,
);
