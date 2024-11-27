import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrAlumnPage } from './qr-alumn.page';

describe('QrAlumnPage', () => {
  let component: QrAlumnPage;
  let fixture: ComponentFixture<QrAlumnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrAlumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
