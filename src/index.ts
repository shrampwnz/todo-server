import { PORT } from './constants';
import * as express from 'express';
import { Database } from './core/classes/Database.class';
import * as bodyParser from 'body-parser';
import { IRequest } from './core/interfaces/IRequest.interface';
import { IResponse } from './core/interfaces/IResponse.interface';

const app = express();
const database = new Database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/users', (request: IRequest, response: IResponse) => {
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

app.get('/todos', async (request: IRequest, response: IResponse) => {
  const id = request.query.id;

  try {
    const snapshot = await database.ref(`users-todos/${id}`).once('value');
    response.end(JSON.stringify(snapshot.val()));
  } catch (error) {
    console.log('The read failed: ' + error.code);
  }
});

app.post('/login', async (request: IRequest, response: IResponse) => {
  const { login, password } = request.body;

  try {
    await database.signIn(login, password);
    response.send({ isSuccess: true });
  } catch (error) {
    response.send(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});