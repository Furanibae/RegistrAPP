import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevisarAsistenciaPage } from './revisar-asistencia.page';

describe('RevisarAsistenciaPage', () => {
  let component: RevisarAsistenciaPage;
  let fixture: ComponentFixture<RevisarAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
