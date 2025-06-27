import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubirPartituraPage } from './subir-partitura.page';

describe('SubirPartituraPage', () => {
  let component: SubirPartituraPage;
  let fixture: ComponentFixture<SubirPartituraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirPartituraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
