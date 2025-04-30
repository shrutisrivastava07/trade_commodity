import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCommodityHomePageComponent } from './trade-commodity-home-page.component';

describe('TradeCommodityHomePageComponent', () => {
  let component: TradeCommodityHomePageComponent;
  let fixture: ComponentFixture<TradeCommodityHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeCommodityHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCommodityHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
