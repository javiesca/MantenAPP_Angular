import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarPiezasComponent } from './guardar-piezas.component';

describe('GuardarPiezasComponent', () => {
  let component: GuardarPiezasComponent;
  let fixture: ComponentFixture<GuardarPiezasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarPiezasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarPiezasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
