import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventAddComponent } from './form-event-add.component';

describe('FormEventAddComponent', () => {
  let component: FormEventAddComponent;
  let fixture: ComponentFixture<FormEventAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEventAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEventAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
