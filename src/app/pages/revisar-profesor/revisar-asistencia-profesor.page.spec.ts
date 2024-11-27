import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevisarAsistenciaProfesorPage } from './revisar-asistencia-profesor.page';

describe('RevisarAsistenciaProfesorPage', () => {
  let component: RevisarAsistenciaProfesorPage;
  let fixture: ComponentFixture<RevisarAsistenciaProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisarAsistenciaProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
