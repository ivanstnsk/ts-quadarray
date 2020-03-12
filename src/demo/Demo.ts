import QuadArray from '../lib/QuadArray';
import {CellType} from '../lib/types';

let canvasElem: HTMLCanvasElement;
let canvasTargetElem: HTMLCanvasElement;
let targetCells: CellType[] | null;

function renderCounter(counter: number, depth: number): void {
  const divElem = document.createElement('div');
  divElem.style.position = 'absolute';
  divElem.style.left = '0px';
  divElem.style.top = '0px';
  divElem.style.padding = '4px';
  divElem.style.backgroundColor = 'black';
  divElem.style.color = 'white';
  divElem.innerText = `Objects: ${counter}\nCells: ${depth}`;
  document.body.appendChild(divElem);
}

function renderArray(array: QuadArray, ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return;

  ctx.beginPath();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < array.cells.length; i++) {
    ctx.moveTo(i * array.cellWidth, 0);
    ctx.lineTo(i * array.cellWidth, canvasElem.height);  
  }
  for (let i = 0; i < array.cells[0].length; i++) {
    ctx.moveTo(0, i * array.cellHeight);
    ctx.lineTo(canvasElem.width, i * array.cellHeight);  
  }

  ctx.stroke();

  for (let i = 0; i < array.cells.length; i++) {
    for (let j = 0; j < array.cells[0].length; j++) {
      const cell = array.cells[i][j];
      ctx.beginPath();
      ctx.font = "15px Arial";
      ctx.fillText(`${cell.id}`, i * array.cellWidth + 4, j * array.cellHeight + 13);
      ctx.lineWidth = 0;
      ctx.fillStyle = "#ffffff";
      cell.children.forEach((child) => {
        ctx.moveTo(child.x, child.y);
        ctx.arc(child.x, child.y, 2, 0, 2 * Math.PI);
      });
      ctx.fill();
      ctx.stroke();
    }
  }
}

function renderTargetCell(width: number, height: number, cells: CellType[] | null, ctx: CanvasRenderingContext2D | null) {
  if (!ctx || !cells || !cells.length) return;

  ctx.clearRect(0, 0, canvasTargetElem.width, canvasTargetElem.height);
  
  cells.forEach((cell) => {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(cell.x, cell.y);
    ctx.lineTo(cell.x + width, cell.y);
    ctx.lineTo(cell.x + width, cell.y + height);
    ctx.lineTo(cell.x, cell.y + height);
    ctx.lineTo(cell.x, cell.y);
    ctx.stroke();

    ctx.beginPath();
    cell.children.forEach((child) => {
      ctx.moveTo(child.x, child.y);
      ctx.arc(child.x, child.y, 2, 0, 2 * Math.PI);
    });
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.stroke();
  });
}

function makeMovements(array: QuadArray, cb: Function) {
  for (let i = 0; i < array.cells.length; i++) {
    for (let j = 0; j < array.cells[0].length; j++) {
      const cell = array.cells[i][j];
      cell.children.forEach((child) => {
        let nextX = child.x + 4;
        let nextY = child.y;
        if (nextX > window.innerWidth) {
          nextX = 0;
        }
        if (nextY > window.innerHeight) {
          nextY = 0;
        }
        child.updatePos(nextX, nextY);
      });
    }
  }

  cb();

  setTimeout(() => makeMovements(array, cb), 100);
}

export function demo(): void {
  document.body.style.padding = '0px';
  document.body.style.margin = '0px';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.padding = '0px';
  document.documentElement.style.margin = '0px';

  canvasElem = document.createElement('canvas');
  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
  canvasElem.style.width = `${window.innerWidth}px`;
  canvasElem.style.height = `${window.innerHeight}px`;
  canvasElem.style.backgroundColor = 'rgba(0,0,0,0.8)';
  document.body.appendChild(canvasElem);

  canvasTargetElem = document.createElement('canvas');
  canvasTargetElem.width = window.innerWidth;
  canvasTargetElem.height = window.innerHeight;
  canvasTargetElem.style.position = 'absolute';
  canvasTargetElem.style.left = '0px';
  canvasTargetElem.style.top = '0px';
  canvasTargetElem.style.width = `${window.innerWidth}px`;
  canvasTargetElem.style.height = `${window.innerHeight}px`;
  canvasTargetElem.style.backgroundColor = 'transparent';
  document.body.appendChild(canvasTargetElem);

  const ctx = canvasElem.getContext('2d');
  const ctxTarget = canvasTargetElem.getContext('2d');
  
  const array = new QuadArray(5, 5, window.innerWidth, window.innerHeight);

  canvasTargetElem.onmousemove = (event) => {
    const { pageX, pageY } = event;
    const targetCell = array.retrive(pageX, pageY);
    if (targetCell) {
      targetCells = [ targetCell ];
    }
    renderTargetCell(array.cellWidth, array.cellHeight, targetCells, ctxTarget);
  }

  canvasTargetElem.onmousedown = (event) => {
    // const { pageX, pageY } = event;
    for (let i = 0; i < 100; i += 1) {
      array.add(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
      );
    }

    const childrenCount = array.getChildrenCount();
    const cellsCount = array.getCellsCount();

    renderArray(array, ctx);
    renderCounter(childrenCount, cellsCount);

  }

  makeMovements(array, () => {
    renderArray(array, ctx);
    const childrenCount = array.getChildrenCount();
    const cellsCount = array.getCellsCount();
    renderCounter(childrenCount, cellsCount);
  });
}
