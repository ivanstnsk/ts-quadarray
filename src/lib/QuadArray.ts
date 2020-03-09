import Cell, { CellChildren } from './Cell';

interface Coord {
  x: number,
  y: number,
}

export default class QuadArray {
  readonly cells: Cell[][];
  readonly cellWidth: number;
  readonly cellHeight: number;

  constructor(xSize: number, ySize: number, width: number, height: number) {
    this.cells = [];
    this.cellWidth = width / xSize;
    this.cellHeight = height / ySize;

    for (let x = 0; x < xSize; x++) {
      this.cells[x] = [];
      for (let y = 0; y < ySize; y++) {
        this.cells[x][y] = new Cell(x, y);
      }  
    }
  }

  add(child: CellChildren): boolean {
    const cell = this.retrive(child.x, child.y);
    if (cell) {
      cell.children.push(child);
      return true;
    }
    return false;
  }

  remove(child: CellChildren): boolean {
    const cell = this.retrive(child.x, child.y);
    if (cell) {
      const childIndex = cell.children.indexOf(child);
      if (childIndex > -1) {
        return cell.children.splice(childIndex, 1).length > 0;
      }
    }
    return false;
  }

  retrive(x: number, y: number): Cell | null {
    const xPad = Math.floor(x / this.cellWidth);
    const yPad = Math.floor(y / this.cellHeight);
    
    if (xPad > 0 && xPad < this.cells.length && yPad > 0 && yPad < this.cells[0].length) {
      return this.cells[xPad][yPad];
    }
    return null;
  }

  retriveAll(coords: Coord[]): Cell[] {
    const result: Cell[] = [];

    coords.forEach(({ x, y }) => {
      const cell = this.retrive(x, y);
      if (cell) {
        result.push(cell);
      }
    });

    return result;
  }
}
