import { requestBase } from './core/utils/base.utils';
import { PORT } from './constants';
import * as express from 'express';
import { Database } from './core/classes/Database.class';
import * as bodyParser from 'body-parser';
import { getTodos } from './core/utils/database.utils';
import { AppResponse } from './core/interfaces/AppResponse.interface';
import { AppRequest } from './core/interfaces/AppRequest.interface';

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
  requestBase(
    request,
    response,
    getTodos(database)
  );
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

  requestBase(
    request,
    response,
    getTodos(database),
    database.ref(`/users-todos/${uid}`).push(data)
  );
})

app.put('/complete-task', async (request: AppRequest, response: AppResponse) => {
  const uid = database.auth.currentUser.uid;
  const { id, isComplete } = request.body;

  requestBase(
    request,
    response,
    getTodos(database),
    database.ref(`/users-todos/${uid}`).child(id).update({ isComplete }),
  );
})

app.put('/description-task', async (request: AppRequest, response: AppResponse) => {
  const uid = database.auth.currentUser.uid;
  const { id, description } = request.body;

  requestBase(
    request,
    response,
    getTodos(database),
    database.ref(`/users-todos/${uid}`).child(id).update({ description }),
  );
})

app.put('/remove-task', (request: AppRequest, response: AppResponse) => {
  const uid = database.auth.currentUser.uid;
  const { id } = request.body;

  requestBase(
    request,
    response,
    getTodos(database),
    database.ref(`/users-todos/${uid}`).child(id).remove(),
  );
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT} port`);
});