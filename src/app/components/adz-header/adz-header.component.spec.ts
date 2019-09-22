import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzHeaderComponent } from './adz-header.component';

describe('AdzHeaderComponent', () => {
  let component: AdzHeaderComponent;
  let fixture: ComponentFixture<AdzHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
