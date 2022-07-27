import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const Indexdb = await openDB('jate', 1);
  const txt = Indexdb.transaction('jate', 'readwrite');
  const stored = txt.objectStore('jate');
  const request = stored.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const Indexdb = await openDB('jate', 1);
  const txt = Indexdb.transaction('jate', 'readonly');
  const stored = txt.objectStore('jate');
  const request = stored.getAll();
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();