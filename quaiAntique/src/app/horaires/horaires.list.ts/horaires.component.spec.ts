import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesComponentTsComponent } from './horaires.component';

describe('HorairesComponentTsComponent', () => {
  let component: HorairesComponentTsComponent;
  let fixture: ComponentFixture<HorairesComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorairesComponentTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorairesComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
