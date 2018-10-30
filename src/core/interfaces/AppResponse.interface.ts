import { ServerResponse } from 'http';

export interface AppResponse extends ServerResponse {
  send: any;
}
