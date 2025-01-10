import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTopicComponent } from './add-edit-topic.component';

describe('AddTopicComponent', () => {
  let component: AddEditTopicComponent;
  let fixture: ComponentFixture<AddEditTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
