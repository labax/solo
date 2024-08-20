import {ItemIdentifier} from "../identifiers/ItemIdentifier";

export interface IInventoryItem {
  id: ItemIdentifier;
  charges: number;
}
