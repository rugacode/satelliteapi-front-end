import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveStickyTopComponent } from './above-sticky-top.component';

describe('AboveStickyTopComponent', () => {
  let component: AboveStickyTopComponent;
  let fixture: ComponentFixture<AboveStickyTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboveStickyTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboveStickyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
