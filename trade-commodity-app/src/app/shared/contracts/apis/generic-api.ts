
//import 'rxjs/Rx';

import * as _ from 'lodash';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams, HttpClientModule } from '@angular/common/http';
import { Injector, Injectable, Type, ReflectiveInjector } from '@angular/core';

import { Subscription } from 'rxjs';
import { ServerPageInput } from './server-page-input';
import { ServerPageModel } from './server-page-model';
import { ServerDataModel } from './server-data-model';
import { IApi } from './api.interface';
import { environment } from 'src/environments/environment';
declare let Reflect: any;


export class GenericApi<TModel> implements IApi<TModel> {

  private rootUrl: string;
  private subscription?: Subscription;

  
  

  getAll(input: ServerPageInput): Promise<ServerPageModel<TModel>> {
    let parms: HttpParams = this.getQueryParams(input);
    if (this.subscription) this.subscription.unsubscribe();
    const observable = this.http.get<ServerPageModel<TModel>>(`${this.rootUrl}/${this.key}`, { headers: this.getHeaders(), params: parms });
    return new Promise((res, rej) => {
      this.subscription = observable.subscribe(response => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || response.error || 'failed').catch(rej);
        }
        return res(response);
      }, async (err) => {
        this.handleError(err).catch(rej);
      });
    })
  }

  create(model: TModel, path?: string): Promise<TModel> {

    let url: string = `${this.rootUrl}/${this.key}`;
    url = path ? `${url}/${path}` : url;

    return this.http.post<ServerDataModel<TModel>>(url, model, { headers: this.getHeaders() })
      .toPromise()
      .then((response) => {
        console.log("response", response);
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || response.error || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  
  update(id: number, model: TModel, input?: ServerPageInput, path?: string): Promise<TModel> {
    let parms;
    if (input) {
      parms = this.getQueryParams(input);
    }
    let url = path ? `${this.rootUrl}/${this.key}/${path}` : `${this.rootUrl}/${this.key}/${id}`;
    return this.http.put<ServerDataModel<TModel>>(url, model, { headers: this.getHeaders(), params: parms })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || response.error || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  

  private getHeaders(): HttpHeaders {
    const obj: any = {
      'Content-Type': 'application/json'
    };
    const token = window.localStorage.getItem('token');
    if (token) {
      obj['x-access-token'] = token;
    }
    const headers = new HttpHeaders(obj);
    return headers;
  }

  private handleError(error: any): Promise<any> {
    // console.log('error', error)
    console.log('HandleError ',error);
    if (error.status === 0) {
      return Promise.reject('There is no internet connection')
    };

    if (error.status) {
      if (error.status == 408) {
        const user = (JSON.parse(localStorage.getItem('user') || ""));
        user.organization.organizationPlan.status = "expired";
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/auth/plan';
      }
      if (error.status === 401) {
        window.onbeforeunload = function () {
          console.log("blank function do nothing")
        }
        return Promise.reject(error.message);
      }
      if (error.status === 403) {
          console.log("403 Error");
          localStorage.clear();
          window.location.href = '/';
      }
      return Promise.reject(error.error); // backend is seding error message wrapped in another error variable
    }

    // if (error.status === 408) {
    //   window.location.href = '/';
    //   localStorage.clear();
    // }
    // if ((error.message && error.message == "no user found") || error == "no user found") {
    //   localStorage.clear();
    //   window.location.href = '/';
    // }
    return Promise.reject(error);
  }

  private getQueryParams(input: ServerPageInput): HttpParams {
    let params: HttpParams = new HttpParams();
    _.each(input, (value:any, key:any) => {
      if (key === 'query') {
        _.each(value as any, (keyVal: string, keyKey: string) => {
          if (keyVal !== null && keyVal !== undefined) {
            params = params.set(keyKey, keyVal);
          }
        });
      } else {
        params = params.set(key, value as any);
      }
    });
    return params;
  }

  constructor(
    private key: string,
    private http: HttpClient,
    private token?: string) {
    this.rootUrl = `${environment.apiUrls.api}/api`;
  }
}
