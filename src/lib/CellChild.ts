import {CellType, CellChildType} from './types';

export class CellChild implements CellChildType {
  cell: CellType;
  public x: number; 
  public y: number;

  constructor(cell: CellType, x: number, y: number) {
    this.cell = cell;
    this.x = x;
    this.y = y;
  }

  updatePos(x: number, y: number): void {
    const needUpdate = x != this.x || y != this.y;
    this.x = x;
    this.y = y;
    if (needUpdate) {
      this.cell.handleChildUpdated(this);
    }
  }

  getOwnIndex(): number {
    if (!this.cell) {
      return -1;
    }
    return this.cell.children.indexOf(this);
  }
}