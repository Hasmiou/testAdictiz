import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzResultComponent } from './adz-result.component';

describe('AdzResultComponent', () => {
  let component: AdzResultComponent;
  let fixture: ComponentFixture<AdzResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
