import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaRevisionPage } from './lista-revision.page';

describe('ListaRevisionPage', () => {
  let component: ListaRevisionPage;
  let fixture: ComponentFixture<ListaRevisionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRevisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
