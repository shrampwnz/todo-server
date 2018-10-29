import { ServerResponse } from 'http';

export interface Response extends ServerResponse {
  send: any;
}
