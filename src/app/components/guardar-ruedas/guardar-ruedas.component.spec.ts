import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarRuedasComponent } from './guardar-ruedas.component';

describe('GuardarRuedasComponent', () => {
  let component: GuardarRuedasComponent;
  let fixture: ComponentFixture<GuardarRuedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarRuedasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarRuedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
