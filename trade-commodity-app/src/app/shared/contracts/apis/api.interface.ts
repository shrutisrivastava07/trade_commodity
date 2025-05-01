import { ServerPageInput } from './server-page-input';
import { ServerDataModel } from './server-data-model';
import { ServerPageModel } from './server-page-model';
import { IGetParams } from './get-params.interface';

export interface IApi<TModel> {

  getAll(input: ServerPageInput): Promise<ServerPageModel<TModel>>;
  create(model: TModel, path?: string, api?: string): Promise<TModel>;
  update(id: number, model: TModel, input?: ServerPageInput, path?: string, api?: string): Promise<TModel>;
 
}
