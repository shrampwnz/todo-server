import { initializeApp, auth, database, app } from 'firebase';
import { DatabaseConfig } from '../interfaces/DatabaseConfig.interface';
import { firebaseConfig, login, password } from '../../configs/firebase.config';

export class Database {
  private _database: database.Database;
  private _app: app.App;

  public set config(config: DatabaseConfig) {
    if (config) {
      this._config = config;
      this.init();
    }
  }

  public get auth(): auth.Auth {
    return this._app.auth();
  }

  constructor(private _config: DatabaseConfig = firebaseConfig) {
    this.init();
  }

  public ref(path: string): database.Reference {
    return this._database.ref(path);
  }

  public set(path: string, body: any): Promise<any> {
    return this.ref(path).set(body);
  }

  public signIn(login: string, password: string): Promise<auth.UserCredential> {
    return auth(this._app).signInWithEmailAndPassword(login, password);
  }
  
  public signOut(): Promise<void> {
    return auth(this._app).signOut();
  }

  private init(): void {
    this._app = initializeApp(this._config)
    this._database = this._app.database();
  }
}
