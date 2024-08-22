import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatRoomComponent } from './combat-room.component';

describe('WeakRoomComponent', () => {
  let component: CombatRoomComponent;
  let fixture: ComponentFixture<CombatRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombatRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
