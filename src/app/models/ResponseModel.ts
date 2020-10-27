import { ErrorResponseModel } from './ErrorResponseModel';

export class ResponseModel {
    okay : boolean;
    data: any;
    error: ErrorResponseModel;
  }