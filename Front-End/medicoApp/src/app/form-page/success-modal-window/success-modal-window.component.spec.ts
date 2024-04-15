import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalWindowComponent } from './success-modal-window.component';

describe('SuccessModalWindowComponent', () => {
  let component: SuccessModalWindowComponent;
  let fixture: ComponentFixture<SuccessModalWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessModalWindowComponent]
    });
    fixture = TestBed.createComponent(SuccessModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
