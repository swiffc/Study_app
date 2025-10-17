import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Workbook } from '../types/workbook';

interface WorkbookDB extends DBSchema {
  workbooks: {
    key: string;
    value: Workbook;
    indexes: { 'by-date': number };
  };
}

let db: IDBPDatabase<WorkbookDB> | null = null;

export async function initDB(): Promise<IDBPDatabase<WorkbookDB>> {
  if (db) return db;
  
  db = await openDB<WorkbookDB>('cursor-workbook-db', 1, {
    upgrade(db) {
      const store = db.createObjectStore('workbooks', { keyPath: 'id' });
      store.createIndex('by-date', 'updatedAt');
    },
  });
  
  return db;
}

export async function saveWorkbook(workbook: Workbook): Promise<void> {
  const database = await initDB();
  await database.put('workbooks', workbook);
}

export async function getWorkbook(id: string): Promise<Workbook | undefined> {
  const database = await initDB();
  return database.get('workbooks', id);
}

export async function getAllWorkbooks(): Promise<Workbook[]> {
  const database = await initDB();
  return database.getAllFromIndex('workbooks', 'by-date');
}

export async function deleteWorkbook(id: string): Promise<void> {
  const database = await initDB();
  await database.delete('workbooks', id);
}

export async function exportWorkbook(workbook: Workbook): Promise<void> {
  const blob = new Blob([workbook.content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${workbook.name}.workbook`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importWorkbook(file: File): Promise<Workbook> {
  const content = await file.text();
  const name = file.name.replace('.workbook', '').replace('.md', '');
  
  return {
    id: crypto.randomUUID(),
    name,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
