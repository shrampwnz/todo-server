import { IncomingMessage } from 'http';

export interface AppRequest extends IncomingMessage {
  body: any;
  query: any;
}