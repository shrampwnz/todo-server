import { PORT } from './constants';
import * as express from 'express';
import { Database } from './core/classes/Database.class';
import { IncomingMessage, ServerResponse } from 'http';
import * as bodyParser from 'body-parser';
import { IRequest } from './core/interfaces/IRequest.interface';
import { IResponse } from './core/interfaces/IResponse.interface';

const app = express();
const database = new Database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/users', (request: IncomingMessage, response: ServerResponse) => {
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

app.post('/login', (request: IRequest, response: IResponse) => {
  const { login, password } = request.body;

  database.signIn(login, password)
    .then(
      () => response.send({ message: 'Success' }),
      (e) => response.send(e)
    );
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});