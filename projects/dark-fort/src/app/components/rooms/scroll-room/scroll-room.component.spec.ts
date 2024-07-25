import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollRoomComponent } from './scroll-room.component';

describe('ScrollRoomComponent', () => {
  let component: ScrollRoomComponent;
  let fixture: ComponentFixture<ScrollRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
