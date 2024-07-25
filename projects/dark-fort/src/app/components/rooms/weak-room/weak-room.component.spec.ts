import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeakRoomComponent } from './weak-room.component';

describe('WeakRoomComponent', () => {
  let component: WeakRoomComponent;
  let fixture: ComponentFixture<WeakRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeakRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeakRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
