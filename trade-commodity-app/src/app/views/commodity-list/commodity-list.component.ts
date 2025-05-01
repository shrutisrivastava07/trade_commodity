import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommodityService } from 'src/app/controllers/commodity.service';
import { CommodityModel } from 'src/app/models/commodity.model';



@Component({
  selector: 'app-commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.scss']
})
export class CommodityListComponent implements OnInit {
  commodities: CommodityModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;



   displayedColumns: string[] = ['id', 'code', 'description', 'quantity'];
    dataSource = new MatTableDataSource<CommodityModel>();
    isLoading = true;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(
      private http: HttpClient, 
      private commodityService: CommodityService,
   
    
    ) {}
  
    ngOnInit() {
      this.fetch();
    }
  
    fetch() {
      //this.dataSource.data = tradeData;
      this.isLoading = true;
      this.commodityService.api.getAll({ query: {} } as any)
        .then((data) => {
          console.log(data); // Check the structure of data to ensure it contains boardingUpdates
           this.dataSource.data = data.items!; // Adjust this line based on the actual structure of your data
           this.isLoading = false;
        })
        .catch((error) => {
          console.error('Error fetching trades:', error);
          this.isLoading = false;
        });
    }
}
