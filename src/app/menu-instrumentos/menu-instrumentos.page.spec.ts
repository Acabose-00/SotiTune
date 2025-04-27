import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuInstrumentosPage } from './menu-instrumentos.page';

describe('MenuInstrumentosPage', () => {
  let component: MenuInstrumentosPage;
  let fixture: ComponentFixture<MenuInstrumentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInstrumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
