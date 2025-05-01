import { HttpClient } from "@angular/common/http";
import { TradeModel } from "../models/trade.model";
import { IApi } from "../shared/contracts/apis/api.interface";
import { GenericApi } from "../shared/contracts/apis/generic-api";
import { APIConstants } from "../constants/API_CONSTANTS";
import { Injectable } from "@angular/core";
import { CommodityModel } from "../models/commodity.model";

@Injectable({
    providedIn: 'root'
  })
  export class CommodityService {
    api: IApi<CommodityModel>;
   
    constructor(
        http: HttpClient,
      //  private appService: AppService
      ) { 
          this.api = new GenericApi<CommodityModel>(APIConstants.COMMODITY, http);
        
      }
  }