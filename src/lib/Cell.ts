export interface CellChildren {
  x: number,
  y: number,
}

export default class Cell {
  public x: number;
  public y: number;
  public children: CellChildren[];

  constructor(x: number, y: number) {
    this.children = [];
    this.x = x;
    this.y = y;
  }
};
