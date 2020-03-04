import Cell from './Cell';

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

  retrive(x: number, y: number): Cell | null {
    const xPad = Math.floor(x / this.cellWidth);
    const yPad = Math.floor(y / this.cellHeight);
    
    if (xPad > 0 && xPad < this.cells.length && yPad > 0 && yPad < this.cells[0].length) {
      return this.cells[xPad][yPad];
    }
    return null;
  }
}
