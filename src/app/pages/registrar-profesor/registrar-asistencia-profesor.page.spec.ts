import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarAsistenciaProfesorPage } from './registrar-asistencia-profesor.page';

describe('RegistrarAsistenciaProfesorPage', () => {
  let component: RegistrarAsistenciaProfesorPage;
  let fixture: ComponentFixture<RegistrarAsistenciaProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAsistenciaProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
