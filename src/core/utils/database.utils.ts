import { Database } from './../classes/Database.class';

export const getTodos = (database: Database) => {
  const uid = database.auth.currentUser.uid;

  return database.ref(`users-todos/${uid}`).once('value');
};
