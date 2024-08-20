import {RoomShape} from "../RoomShape";
import {Cardinality} from "../Cardinality";

import {roomType} from "../RoomType";

export interface IRoom {
  shape: RoomShape;
  exits: Cardinality[];
  x: number;
  y: number;
  type: roomType;
}
