import { AppResponse } from './../interfaces/AppResponse.interface';
import { AppRequest } from './../interfaces/AppRequest.interface';
import { mapToItem } from './mappers.utils';
import { database } from 'firebase';

export const requestBase = async (
  request: AppRequest,
  response: AppResponse,
  responseDataPromise: Promise<any>,
  promise?: Promise<any> | database.ThenableReference
) => {
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
