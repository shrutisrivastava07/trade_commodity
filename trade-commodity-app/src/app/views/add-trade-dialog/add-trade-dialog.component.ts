import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommodityService } from 'src/app/controllers/commodity.service';
import { TradesService } from 'src/app/controllers/trades.service';
import { TradeModel } from 'src/app/models/trade.model';

@Component({
  selector: 'app-add-trade-dialog',
  templateUrl: './add-trade-dialog.component.html',
})
export class AddTradeDialogComponent implements OnInit {
  // @Input() trade?: {
    //   id: number;
    //   commodity: string;
    //   quantity: number;
    //   type: string;
    //   action: string;
    // }; // Input for the trade object (optional)
    tradeForm: FormGroup;
    trade: TradeModel = {} as TradeModel;
    commodities: { id: number; code: string }[] = [
      { id: 1, code: 'TCS' },
      { id: 2, code: 'REL' },
      { id: 3, code: 'INFY' },
    ];
    
    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddTradeDialogComponent>,
      private tradeServices: TradesService,
      private commodityService: CommodityService,
      @Inject(MAT_DIALOG_DATA) public data: any,
     
  ) {
    this.tradeForm = this.fb.group({
      id: [null], // Trade ID (optional)
      commodity: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      action: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.trade) {
      this.trade = this.data.trade;
      console.log('Trade:', this.trade);
      this.fetchCommodities() 
      this.loadTradeDetails(this.trade);
      this.enableDisableFields(this.data.action);
    }
  }
  fetchCommodities() {
    //this.dataSource.data = tradeData;
   
    this.commodityService.api.getAll({ query: {} } as any)
      .then((data) => {
        console.log(data); // Check the structure of data to ensure it contains boardingUpdates
         const commodityList= data.items!; // Adjust this line based on the actual structure of your data
         this.commodities = commodityList
          .map((item: any) => ({
          id: item.id,
          code: item.code,
          }))
          .sort((a, b) => a.code.localeCompare(b.code));
        console.log('Commodities:', this.commodities);
         
      })
      .catch((error) => {
        console.error('Error fetching trades:', error);
       
      });
  }

  enableDisableFields(action: string) {
    
    // this.tradeForm.patchValue({ action });
    if (action === 'UPDATE' && this.trade) {
      this.tradeForm.get('action')?.disable();
     // this.loadTradeDetails(this.trade);
    } else if (action === 'CANCEL') {
 
     this.tradeForm.get('action')?.disable();
      this.tradeForm.get('quantity')?.disable();
      this.tradeForm.get('type')?.disable();
    } else {
      this.tradeForm.get('commodity')?.enable();
      this.tradeForm.get('quantity')?.enable();
      this.tradeForm.get('type')?.enable();
    }
  }

  private loadTradeDetails(trade: TradeModel) { {
    this.tradeForm.patchValue({
      id: trade.tradeId,
      commodity: trade.commodity,
      quantity: trade.quantity,
      type: trade.type,
      action: this.data.action,
    });
  }
}

onSubmit() {
  if (this.tradeForm.valid) {
    const updateTrade = {
      ...this.tradeForm.value,
      action: this.data.action,
      tradeId: this.trade.tradeId,
      transactionId: this.trade.transactionId,
      tradeVersionId: this.trade.tradeVersionId,
    };
    console.log('trade', this.trade);
    console.log('tradeID', this.trade.tradeId);
    console.log('updateTrade', updateTrade);
    this.tradeServices.api
      .create(updateTrade)
      .then((val) => {
        console.log('val', val);
        let successMessage = '';
        if (this.data.action === 'UPDATE') {
          successMessage = 'Trade updated successfully';
        } else if (this.data.action === 'CANCEL') {
          successMessage = 'Trade cancelled successfully';
        } else {
          successMessage = 'Trade created successfully';
        }
        alert(successMessage);
        this.dialogRef.close(true); // Pass a value to indicate success
      })
      .catch((err) => {
        console.error('Error creating trade:', err.message);
        alert('Error creating/updating trade:' + err.message);
      });
  } else {
    this.showValidationErrors();
  }
}

  private showValidationErrors() {
    const errors: string[] = [];
    const controls = this.tradeForm.controls;

    if (controls['commodity'].hasError('required')) {
      errors.push('Commodity is required.');
    }
    if (controls['quantity'].hasError('required')) {
      errors.push('Quantity is required.');
    } else if (controls['quantity'].hasError('min')) {
      errors.push('Quantity must be at least 1.');
    }
    if (controls['type'].hasError('required')) {
      errors.push('Type is required.');
    }
    if (controls['action'].hasError('required')) {
      errors.push('Action is required.');
    }

    if (errors.length > 0) {
      alert('Validation Errors:\n' + errors.join('\n'));
    }
  }
}
