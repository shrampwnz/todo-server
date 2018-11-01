import { PORT } from './constants';
import * as express from 'express';
import { Database } from './core/classes/Database.class';
import * as bodyParser from 'body-parser';
import { getTodos } from './core/utils/database.utils';
import { AppResponse } from './core/interfaces/AppResponse.interface';
import { AppRequest } from './core/interfaces/AppRequest.interface';
import { mapToItem } from './core/utils/mappers.utils';

const app = express();
const database = new Database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/users', (request: AppRequest, response: AppResponse) => {
  database.ref('users').on(
    'value',
    snapshot => {
      response.end(JSON.stringify(snapshot.val()));
    },
    errorObject => {
      console.log('The read failed: ' + errorObject.code);
    }
  );
});

app.get('/todos', async (request: AppRequest, response: AppResponse) => {
  try {
    const snapshot = await getTodos(database);
    response.end(JSON.stringify(mapToItem(snapshot.val())));
  } catch (error) {
    console.log('The read failed: ' + error.code);
  }
});

app.post('/login', async (request: AppRequest, response: AppResponse) => {
  const { login, password } = request.body;

  try {
    await database.signIn(login, password);
    response.send({ isSuccess: true });
  } catch (error) {
    response.send(error);
  }
})

app.put('/add-task', async (request: AppRequest, response: AppResponse) => {
  const uid = database.auth.currentUser.uid;
  const data = request.body;


  try {
    await database.ref(`/users-todos/${uid}`).push(data);
    const snapshot = await getTodos(database);

    response.end(JSON.stringify(mapToItem(snapshot.val())));
  } catch (error) {
    console.log(`[ERROR] ${error}`);
  }
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});