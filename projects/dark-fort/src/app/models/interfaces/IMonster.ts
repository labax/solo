import {StateService} from "../../services/state.service";
import {DiceService} from "../../../../../common/src/lib/services/dice.service";

import {MonsterIdentifier} from "../identifiers/MonsterIdentifier";

export interface IMonster {
  name: string;
  damage: (state: StateService) => Promise<number>;
  hitPoints: number;
  points: number;
  id: MonsterIdentifier;
  onKill?: (state: StateService, dice: DiceService) => Promise<void>;
}
