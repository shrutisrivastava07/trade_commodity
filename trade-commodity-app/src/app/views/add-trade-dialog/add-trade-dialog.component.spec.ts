import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTradeDialogComponent } from './add-trade-dialog.component';

describe('AddTradeDialogComponent', () => {
  let component: AddTradeDialogComponent;
  let fixture: ComponentFixture<AddTradeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTradeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
