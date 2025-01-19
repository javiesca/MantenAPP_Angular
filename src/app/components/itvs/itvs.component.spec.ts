import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItvsComponent } from './itvs.component';

describe('ItvsComponent', () => {
  let component: ItvsComponent;
  let fixture: ComponentFixture<ItvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItvsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
