import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversacionDetallesComponent } from './conversacion-detalles.component';

describe('ConversacionDetallesComponent', () => {
  let component: ConversacionDetallesComponent;
  let fixture: ComponentFixture<ConversacionDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversacionDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversacionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
