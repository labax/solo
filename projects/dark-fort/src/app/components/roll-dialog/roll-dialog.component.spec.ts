import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDialogComponent } from './roll-dialog.component';

describe('RollDialogComponent', () => {
  let component: RollDialogComponent;
  let fixture: ComponentFixture<RollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
