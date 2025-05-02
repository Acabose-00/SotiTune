import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuUsuarioPage } from './menu-usuario.page';

describe('MenuUsuarioPage', () => {
  let component: MenuUsuarioPage;
  let fixture: ComponentFixture<MenuUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
