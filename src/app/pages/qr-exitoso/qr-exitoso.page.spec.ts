import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrExitosoPage } from './qr-exitoso.page';

describe('QrExitosoPage', () => {
  let component: QrExitosoPage;
  let fixture: ComponentFixture<QrExitosoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrExitosoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
