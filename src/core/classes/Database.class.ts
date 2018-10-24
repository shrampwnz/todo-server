import { initializeApp, auth, app, database } from 'firebase';
import { DatabaseConfig } from '../interfaces/DatabaseConfig.interface';
import { firebaseConfig, login, password } from '../../configs/firebase.config';

export class Database {
  private _database: database.Database;

  public set config(config: DatabaseConfig) {
    if (config) {
      this._config = config;
    }
  }

  constructor(private _config: DatabaseConfig = firebaseConfig) {
    this.init();
  }

  public get(route: string): database.Reference {
    return this._database.ref(route);
  }

  private init(): Database {
    const app = initializeApp(this._config);
    this._database = app.database();

    auth(app).signInWithEmailAndPassword(login, password)
      .then((res) => {
        console.log(res);
      });

    return this;
  }
}