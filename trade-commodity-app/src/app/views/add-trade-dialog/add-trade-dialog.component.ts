import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TradesService } from 'src/app/controllers/trades.service';

@Component({
  selector: 'app-add-trade-dialog',
  templateUrl: './add-trade-dialog.component.html',
})
export class AddTradeDialogComponent {
  tradeForm: FormGroup;

  constructor(
    private fb: FormBuilder,

    public dialogRef: MatDialogRef<AddTradeDialogComponent>,
    private tradeServices: TradesService

  ) {
    this.tradeForm = this.fb.group({
      commodity: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      counterparty: ['', Validators.required],
      status: ['Pending', Validators.required],
    });
  }

  onSubmit() {
    if (this.tradeForm.valid) {
      const newTrade = {
        ...this.tradeForm.value,
        totalPrice: this.tradeForm.value.quantity * this.tradeForm.value.price,
      };
      this.tradeServices.api.create(newTrade).then((data) => {} );
      // this.http.post('/api/trades', newTrade).subscribe({
      //   next: () => this.dialogRef.close(true), // true means success
      //   error: (err) => alert('Error adding trade: ' + err.message),
      // });
      this.tradeServices.api.create(newTrade).then((val) => {
        console.log("val",val);
        alert('Trade created succesfully ');
        this.dialogRef.close(val);
      })
      .catch((err) => {
        console.error('Error creating trade:', err);
        alert('Error creating trade: ' + err.message);
      });
    }
  }

 
}
