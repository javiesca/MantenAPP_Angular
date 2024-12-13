import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePiezasComponent } from './update-piezas.component';

describe('UpdatePiezasComponent', () => {
  let component: UpdatePiezasComponent;
  let fixture: ComponentFixture<UpdatePiezasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePiezasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePiezasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
