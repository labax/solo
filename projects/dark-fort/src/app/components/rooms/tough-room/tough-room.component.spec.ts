import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToughRoomComponent } from './tough-room.component';

describe('ToughRoomComponent', () => {
  let component: ToughRoomComponent;
  let fixture: ComponentFixture<ToughRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToughRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToughRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
