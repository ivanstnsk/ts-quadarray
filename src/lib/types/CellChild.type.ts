import {CellType} from './Cell.type';

export interface CellChildType {
  cell: CellType;
  x: number;
  y: number;
  updatePos: (x: number, y: number) => void;
  getOwnIndex: () => number;
}