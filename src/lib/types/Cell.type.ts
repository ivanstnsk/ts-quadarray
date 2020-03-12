import {CellChildType} from './CellChild.type';
import { CellChild } from '../CellChild';

export interface CellType {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  children: CellChildType[];
  handleChildUpdated(child: CellChildType): void;
  removeChild(child: CellChild): boolean;
  addChild(child: CellChildType): boolean;
}
