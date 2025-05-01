import { ServerPageInput } from './server-page-input';

export interface IGetParams {
  id?: string ;
  serverPageInput?: ServerPageInput;
  path?: string;
  api?:string;

}
