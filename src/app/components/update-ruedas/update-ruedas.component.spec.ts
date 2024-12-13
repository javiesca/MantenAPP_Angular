import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRuedasComponent } from './update-ruedas.component';

describe('UpdateRuedasComponent', () => {
  let component: UpdateRuedasComponent;
  let fixture: ComponentFixture<UpdateRuedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRuedasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRuedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
