import { initializeApp, auth, database } from 'firebase';
import { DatabaseConfig } from '../interfaces/DatabaseConfig.interface';
import { firebaseConfig, login, password } from '../../configs/firebase.config';

export class Database {
  private _database: database.Database;

  public set config(config: DatabaseConfig) {
    if (config) {
      this._config = config;
    }
  }

  constructor(private _config: DatabaseConfig = firebaseConfig) { }

  public ref(path: string): database.Reference {
    return this._database.ref(path);
  }

  public set(path: string, body: any): Promise<any> {
    return this.ref(path).set(body);
  }

  public signIn(login: string, password: string): Promise<auth.UserCredential> {
    const app = initializeApp(this._config);
    this._database = app.database();

    return auth(app).signInWithEmailAndPassword(login, password);
  }
}
