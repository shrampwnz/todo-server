import { ServerResponse } from 'http';

export interface IResponse extends ServerResponse {
  send: any;
}
