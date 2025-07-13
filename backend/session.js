import sqlite3 from 'sqlite3';

export const connection = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to db');
});
