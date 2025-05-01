import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

import { TradeModel } from 'src/app/models/trade.model';
import { TradesService } from 'src/app/controllers/trades.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTradeDialogComponent } from '../add-trade-dialog/add-trade-dialog.component';


@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  displayedColumns: string[] = ['transactionId', 'tradeId', 'tradeVersionId', 'commodity', 'quantity', 'action', 'type'];
  dataSource = new MatTableDataSource<TradeModel>();
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, 
    private tradeServices: TradesService,
    public dialog: MatDialog,
  
  ) {}

  ngOnInit() {
    this.fetchTrades();
  }

  fetchTrades() {
    //this.dataSource.data = tradeData;
    this.isLoading = true;
    this.tradeServices.api.getAll({ query: {} } as any)
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



openAddTradeDialog() {
  const dialogRef = this.dialog.open(AddTradeDialogComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.fetchTrades(); // Reload the trade list after adding
    }
  });
}




cancelTrade(trade: TradeModel) {
  this.fetchTrades();
}

updateTrade(trade: TradeModel) {
  this.fetchTrades();
}



getActionClass(action: string): string {
  switch (action) {
    case 'INSERT':
      return 'action-insert';
    case 'UPDATE':
      return 'action-update';
    case 'DELETE':
      return 'action-delete';
    default:
      return '';
  }
}

getTypeClass(type: string): string {
  switch (type) {
    case 'BUY':
      return 'type-buy';
    case 'SELL':
      return 'type-sell';
    default:
      return '';
  }
}
}
// const tradeData: TradeModel[] = [
//   {
//     id: 1,
//     commodity: "Gold",
//     quantity: 10,
//     price: 1800,
//     counterparty: "Trader A",
//     totalPrice: 18000,
//     status: "Settled"
//   },
//   {
//     id: 2,
//     commodity: "Silver",
//     quantity: 50,
//     price: 25,
//     counterparty: "Trader B",
//     totalPrice: 1250,
//     status: "Placed"
//   },
//   {
//     id: 3,
//     commodity: "Crude Oil",
//     quantity: 100,
//     price: 70,
//     counterparty: "Trader C",
//     totalPrice: 7000,
//     status: "Expired"
//   }
// ];