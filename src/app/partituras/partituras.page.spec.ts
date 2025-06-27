import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiturasPage } from './partituras.page';

describe('PartiturasPage', () => {
  let component: PartiturasPage;
  let fixture: ComponentFixture<PartiturasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
