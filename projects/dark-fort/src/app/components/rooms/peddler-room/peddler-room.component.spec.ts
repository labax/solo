import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeddlerRoomComponent } from './peddler-room.component';

describe('PeddlerRoomComponent', () => {
  let component: PeddlerRoomComponent;
  let fixture: ComponentFixture<PeddlerRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeddlerRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeddlerRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
