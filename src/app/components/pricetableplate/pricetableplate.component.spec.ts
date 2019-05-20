import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetableplateComponent } from './pricetableplate.component';

describe('PricetableplateComponent', () => {
  let component: PricetableplateComponent;
  let fixture: ComponentFixture<PricetableplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetableplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetableplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
