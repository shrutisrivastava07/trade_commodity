import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TradesService } from 'src/app/controllers/trades.service';

@Component({
  selector: 'app-add-trade-dialog',
  templateUrl: './add-trade-dialog.component.html',
})
export class AddTradeDialogComponent {
  tradeForm: FormGroup;
  commodities: { id: number; code: string }[] = [
    { id: 1, code: 'TCS' },
    { id: 2, code: 'REL' },
    { id: 3, code: 'INFY' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTradeDialogComponent>,
    private tradeServices: TradesService
  ) {
    this.tradeForm = this.fb.group({
      commodity: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      // type: ['', [Validators.required, Validators.pattern(/^(INSERT|UPDATE|CANCEL)$/)]], // Added type field with validation
      // action: ['', [Validators.required, Validators.pattern(/^(BUY|SELL)$/)]], // Added action field with validation
      type: ['', Validators.required], // Added type field with validation
      action: ['', Validators.required], // Added action field with validation

 
    });
  }

  onSubmit() {
    if (this.tradeForm.valid) {
      const newTrade = {
        ...this.tradeForm.value,
       // totalPrice: this.tradeForm.value.quantity * this.tradeForm.value.price,
      };
      this.tradeServices.api
        .create(newTrade)
        .then((val) => {
          console.log('val', val);
          alert('Trade created successfully');
          this.dialogRef.close();
        })
        .catch((err) => {
          console.error('Error creating trade:', err);
          alert('Error creating trade: ' + err.message);
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
    } else if (controls['type'].hasError('pattern')) {
      errors.push('Type must be one of the following: INSERT, UPDATE, CANCEL.');
    }
    if (controls['action'].hasError('required')) {
      errors.push('Action is required.');
    } else if (controls['action'].hasError('pattern')) {
      errors.push('Action must be either BUY or SELL.');
    }

    if (errors.length > 0) {
      alert('Validation Errors:\n' + errors.join('\n'));
    }
  }

  onActionChange($event: { value: string }) {
    console.log('onActionChange', $event);
    if ($event.value === 'INSERT') {
      this.tradeForm.patchValue({ type: 'BUY' });
    }
  }
}
