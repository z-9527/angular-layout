import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsisTextComponent } from './ellipsis-text.component';

describe('EllipsisTextComponent', () => {
  let component: EllipsisTextComponent;
  let fixture: ComponentFixture<EllipsisTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EllipsisTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipsisTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
