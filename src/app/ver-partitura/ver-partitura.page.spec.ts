import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPartituraPage } from './ver-partitura.page';

describe('VerPartituraPage', () => {
  let component: VerPartituraPage;
  let fixture: ComponentFixture<VerPartituraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPartituraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
