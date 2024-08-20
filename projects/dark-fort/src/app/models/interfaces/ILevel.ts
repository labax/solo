import {levelIdentifier} from "../identifiers/LevelIdentifier";
import {StateService} from "../../services/state.service";
import {MonsterIdentifier} from "../identifiers/MonsterIdentifier";

export interface ILevel {
  id: levelIdentifier,
  description: string,
  onLevel: (state: StateService, name?: string, halved?: MonsterIdentifier[]) => void,
}
