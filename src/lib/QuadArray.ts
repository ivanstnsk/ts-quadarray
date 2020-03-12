import {CellType, CellChildType, QuadArrayType} from './types';
import {Cell} from './Cell';
import {CellChild} from './CellChild'; 

/* TODO: 
  Figure out how to split an array
*/
export default class QuadArray implements QuadArrayType {
  cells: CellType[][];
  cellWidth: number;
  cellHeight: number;
  private childrenCount: number;
  private cellsCounter = 0;
  private deepLevel: number;
  private maxDeepLevel = 5;
  private childrenPerCell = 20;

  constructor(xSize: number, ySize: number, width: number, height: number) {
    this.cells = [];
    this.childrenCount = 0;
    this.cellWidth = width / xSize;
    this.cellHeight = height / ySize;
    this.deepLevel = 0;

    for (let x = 0; x < xSize; x++) {
      this.cells[x] = [];
      for (let y = 0; y < ySize; y++) {
        this.cellsCounter += 1;
        this.cells[x][y] = new Cell(this, this.cellsCounter, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
      }  
    }
  }

  /**
   * Add new child to the array
   * @param child to add
   */
  add(x: number, y: number): boolean {
    const cell = this.retrive(x, y);
    if (cell) {
      cell.children.push(
        new CellChild(cell, x, y)
      );
      this.childrenCount += 1;
      return true;
    }
    return false;
  }

  /**
   * Removes provided child from a cell
   * @param child 
   */
  remove(child: CellChildType): boolean {
    const cell = this.retrive(child.x, child.y);
    if (cell) {
      const childIndex = cell.children.indexOf(child);
      if (childIndex > -1) {
        const removed = cell.children.splice(childIndex, 1).length > 0;
        if (removed) {
          this.childrenCount -= 1;
        }
        return removed;
      }
    }
    return false;
  }

  /**
   * Returns a Cell that intersects provided coordinates
   * @param x coordinate
   * @param y coordinate
   */
  retrive(x: number, y: number): CellType | null {
    const xPad = Math.floor(x / this.cellWidth);
    const yPad = Math.floor(y / this.cellHeight);
    
    if (xPad > -1 && xPad < this.cells.length && yPad > -1 && yPad < this.cells[0].length) {
      return this.cells[xPad][yPad];
    }
    return null;
  }

   /**
    * Returns all Cells that intersects provided coordinates as array { x, y }
    * @param coords array of coordinates { x, y }
    */
  retriveAll(coords: CellChildType[]): CellType[] {
    const result: CellType[] = [];

    coords.forEach(({ x, y }) => {
      const cell = this.retrive(x, y);
      if (cell) {
        result.push(cell);
      }
    });

    return result;
  }

  getChildrenCount(): number {
    let sum = 0;
    this.cells.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        sum += cell.children.length;
      })
    })
    return sum;
  }

  getCellsCount(): number {
    if (this.cells.length > 0) {
      return this.cells.length * this.cells[0].length;
    }
    return this.cells.length;
  }

  transfer(child: CellChildType): boolean {
    // console.log('prepare to transfer');
    const nextCell = this.retrive(child.x, child.y);
    if (nextCell) {
      const removed = child.cell.removeChild(child);
      if (removed) {
        nextCell.addChild(child);
      }
      return true;
    }
    return false;
  }
}
