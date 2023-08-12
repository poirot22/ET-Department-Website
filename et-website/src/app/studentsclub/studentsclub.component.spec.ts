import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsclubComponent } from './studentsclub.component';

describe('StudentsclubComponent', () => {
  let component: StudentsclubComponent;
  let fixture: ComponentFixture<StudentsclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
