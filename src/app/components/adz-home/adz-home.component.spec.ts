import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzHomeComponent } from './adz-home.component';

describe('AdzHomeComponent', () => {
  let component: AdzHomeComponent;
  let fixture: ComponentFixture<AdzHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
