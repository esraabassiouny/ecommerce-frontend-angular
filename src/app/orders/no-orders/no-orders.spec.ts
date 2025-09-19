import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrders } from './no-orders';

describe('NoOrders', () => {
  let component: NoOrders;
  let fixture: ComponentFixture<NoOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
