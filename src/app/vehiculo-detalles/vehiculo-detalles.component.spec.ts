import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoDetallesComponent } from './vehiculo-detalles.component';

describe('VehiculoDetallesComponent', () => {
  let component: VehiculoDetallesComponent;
  let fixture: ComponentFixture<VehiculoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiculoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
