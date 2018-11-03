import { AppResponse } from './../interfaces/AppResponse.interface';
import { AppRequest } from './../interfaces/AppRequest.interface';
import { Database } from './../classes/Database.class';
import { getTodos } from './database.utils';
import { mapToItem } from './mappers.utils';

export const requestBase = async (request: AppRequest, response: AppResponse, responseDataPromise: Promise<any>, promise?: Promise<any>) => {
  try {
    if (promise) {
      await promise;      
    }

    const snapshot = await responseDataPromise;

    response.end(JSON.stringify(mapToItem(snapshot.val())));
  } catch (error) {
    console.log(`[ERROR] ${error}`);
  }
};
