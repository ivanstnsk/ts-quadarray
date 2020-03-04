export default class Cell {
  public x: number;
  public y: number;
  public children: any[];

  constructor(x: number, y: number) {
    this.children = [];
    this.x = x;
    this.y = y;
  }
};
