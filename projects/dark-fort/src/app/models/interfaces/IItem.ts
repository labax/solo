import {StateService} from "../../services/state.service";

import {ItemIdentifier} from "../identifiers/ItemIdentifier";

export interface IItem {
  name: string;
  silver: number;
  id: ItemIdentifier;
  onUse?: (state: StateService) => void;
  chargeable: boolean;
}
