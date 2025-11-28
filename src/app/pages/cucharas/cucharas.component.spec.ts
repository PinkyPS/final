import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CucharasComponent } from './cucharas.component';

describe('CucharasComponent', () => {
  let component: CucharasComponent;
  let fixture: ComponentFixture<CucharasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CucharasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CucharasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
