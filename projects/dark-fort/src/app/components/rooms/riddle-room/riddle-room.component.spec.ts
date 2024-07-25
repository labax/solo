import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiddleRoomComponent } from './riddle-room.component';

describe('RiddleRoomComponent', () => {
  let component: RiddleRoomComponent;
  let fixture: ComponentFixture<RiddleRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiddleRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiddleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
