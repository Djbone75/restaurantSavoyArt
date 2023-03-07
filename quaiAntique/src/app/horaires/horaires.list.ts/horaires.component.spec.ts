import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesComponent } from './horaires.component';

describe('HorairesComponentTsComponent', () => {
  let component: HorairesComponent;
  let fixture: ComponentFixture<HorairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorairesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
