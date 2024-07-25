import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRoomComponent } from './item-room.component';

describe('ItemRoomComponent', () => {
  let component: ItemRoomComponent;
  let fixture: ComponentFixture<ItemRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
