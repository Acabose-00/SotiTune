import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedidorAfinacionPage } from './medidor-afinacion.page';

describe('MedidorAfinacionPage', () => {
  let component: MedidorAfinacionPage;
  let fixture: ComponentFixture<MedidorAfinacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidorAfinacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
