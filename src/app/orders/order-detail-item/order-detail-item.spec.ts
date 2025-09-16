import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailItem } from './order-detail-item';

describe('OrderDetailItem', () => {
  let component: OrderDetailItem;
  let fixture: ComponentFixture<OrderDetailItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
