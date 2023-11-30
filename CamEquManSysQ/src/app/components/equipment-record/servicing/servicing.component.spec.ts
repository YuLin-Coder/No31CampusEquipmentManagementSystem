import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicingComponent } from './servicing.component';

describe('ServicingComponent', () => {
  let component: ServicingComponent;
  let fixture: ComponentFixture<ServicingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
