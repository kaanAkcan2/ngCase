export interface ResponseModel<T> {
    success: boolean;
    data?: T;
    message?: string;
    statusCode?:number;
    error?: any;
  }