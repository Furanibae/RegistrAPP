import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrProfPage } from './qr-prof.page';

describe('QrProfPage', () => {
  let component: QrProfPage;
  let fixture: ComponentFixture<QrProfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
