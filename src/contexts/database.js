import React, { useContext, useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';

const DatabaseContext = React.createContext()

export function useDatabase() {
  return useContext(DatabaseContext)
}

export function DatabaseProvider({  children }) {
  const [database, setDatabase] = useState()

  const db = SQLite.openDatabase('Ontime2.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS message (id INTEGER PRIMARY KEY AUTOINCREMENT, chats TEXT)',
        [],
        () => {
          // Table created successfully
          setDatabase(db); // Set database after table creation
          
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  }, []);
  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  )
}