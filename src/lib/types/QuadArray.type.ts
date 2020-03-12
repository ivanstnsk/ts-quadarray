import {CellChildType} from './CellChild.type'

export interface QuadArrayType {
  transfer(child: CellChildType): boolean;
}