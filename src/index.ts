import { PORT } from './constants';
import * as express from 'express';
import { Database } from './core/classes/Database.class';

const app = express();
const database = new Database().init();

app.get('/info', (request, response) => {
  database.get(
    'info',
    snapshot => {
      response.end(JSON.stringify(snapshot.val()));
    },
    errorObject => {
      console.log('The read failed: ' + errorObject.code);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});