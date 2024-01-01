import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BivaGridComponent } from './biva-grid.component';

describe('BivaGridComponent', () => {
  let component: BivaGridComponent;
  let fixture: ComponentFixture<BivaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BivaGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BivaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
