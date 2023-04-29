import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecComponent } from './cybersec.component';

describe('CybersecComponent', () => {
  let component: CybersecComponent;
  let fixture: ComponentFixture<CybersecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CybersecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CybersecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
