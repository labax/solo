import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapRoomComponent } from './trap-room.component';

describe('TrapRoomComponent', () => {
  let component: TrapRoomComponent;
  let fixture: ComponentFixture<TrapRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrapRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrapRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
