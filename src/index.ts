import { PORT } from './constants';
import * as express from 'express';
import { Database } from './core/classes/Database.class';
import * as bodyParser from 'body-parser';
import { Request } from './core/interfaces/Request.interface';
import { Response } from './core/interfaces/Response.interface';

const app = express();
const database = new Database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/users', (request: Request, response: Response) => {
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

app.get('/todos', async (request: Request, response: Response) => {
  const id = request.query.id;

  try {
    const snapshot = await database.ref(`users-todos/${id}`).once('value');
    response.end(JSON.stringify(snapshot.val()));
  } catch (error) {
    console.log('The read failed: ' + error.code);
  }
});

app.post('/login', async (request: Request, response: Response) => {
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