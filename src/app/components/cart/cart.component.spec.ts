import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShcartComponent } from './cart.component';

describe('ShcartComponent', () => {
  let component: ShcartComponent;
  let fixture: ComponentFixture<ShcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
