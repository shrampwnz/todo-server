import { initializeApp, auth, app, database } from 'firebase';
import { DatabaseConfig } from '../interfaces/DatabaseConfig.interface';
import { firebaseConfig, login, password } from '../../configs/firebase.config';

export class Database {
  private _config = firebaseConfig;

  private _database: database.Database;

  public set config(config: DatabaseConfig) {
    if (config) {
      this._config = config;
    }
  }

  constructor(config: DatabaseConfig = null) {
    if (config) {
      this._config = config;
    }
  }

  public init(): Database {
    const app = initializeApp(this._config);
    this._database = app.database();

    auth(app).signInWithEmailAndPassword(login, password)
      .then((res) => {
        console.log(res);
      });

    return this;
  }

  public get(route: string, callback: any, errorHandler?: any): any {
    return this._database.ref(route).on('value', callback);
  }
}