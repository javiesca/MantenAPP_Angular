import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarVehiculoComponent } from './guardar-vehiculo.component';

describe('GuardarVehiculoComponent', () => {
  let component: GuardarVehiculoComponent;
  let fixture: ComponentFixture<GuardarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarVehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
