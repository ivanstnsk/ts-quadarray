import {CellType, CellChildType, QuadArrayType} from './types';

export class Cell implements CellType {
  public qa: QuadArrayType;
  public id: number;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public children: CellChildType[];

  constructor(qa: QuadArrayType, id: number, x: number, y: number, width: number, height: number) {
    this.qa = qa;
    this.children = [];
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  handleChildUpdated(child: CellChildType) {
    if (this.childInBounds(child)) {
      // console.log('IN BOUNDS ', this.id);
    } else {
      // console.log('CHILD OUT OF BOUNDS ', this.id);
      const transfered = this.qa.transfer(child);
      if (transfered) {
        
      }
    }
  }

  /**
   * Return true if added
   * @param child 
   */
  addChild(child: CellChildType) {
    const prevLength = this.children.length;
    const added = this.children.push(child) !== prevLength;
    if (added) {
      child.cell = this;
    }
    return added;
  }

  /**
   * Return true if removed
   * @param child 
   */
  removeChild(child: CellChildType) {
    const childIndex = child.getOwnIndex();
    if (childIndex > -1) {
      return this.children.splice(childIndex, 1).length > 0;
    }
    return false;
  }

  private childInBounds(child: CellChildType): boolean {
    return (child.x > this.x && child.x < this.x + this.width && child.y > this.y && this.y < this.y + this.height);
  }
};
