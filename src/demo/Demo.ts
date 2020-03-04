import QuadArray from '../lib/QuadArray';
import Cell from '../lib/Cell';

let canvasElem: HTMLCanvasElement;
let canvasTargetElem: HTMLCanvasElement;
let targetCell: Cell | null;

function renderCounter(counter: number, depth: number): void {
  const divElem = document.createElement('div');
  divElem.style.position = 'absolute';
  divElem.style.left = '0px';
  divElem.style.top = '0px';
  divElem.style.padding = '4px';
  divElem.style.backgroundColor = 'black';
  divElem.style.color = 'white';
  divElem.innerText = `Objects: ${counter}\nDepth: ${depth}`;
  document.body.appendChild(divElem);
}

function renderArray(array: QuadArray, ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return;

  ctx.beginPath();

  for (let i = 0; i < array.cells.length; i++) {
    ctx.moveTo(i * array.cellWidth, 0);
    ctx.lineTo(i * array.cellWidth, canvasElem.height);  
  }
  for (let i = 0; i < array.cells[0].length; i++) {
    ctx.moveTo(0, i * array.cellHeight);
    ctx.lineTo(canvasElem.width, i * array.cellHeight);  
  }

  ctx.stroke();
}

function renderTargetCell(width: number, height: number, cell: Cell | null, ctx: CanvasRenderingContext2D | null) {
  if (!ctx || !cell) return;

  ctx.clearRect(0, 0, canvasTargetElem.width, canvasTargetElem.height);
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(cell.x * width, cell.y * height);
  ctx.lineTo(cell.x * width + width, cell.y * height);
  ctx.lineTo(cell.x * width + width, cell.y * height + height);
  ctx.lineTo(cell.x * width, cell.y * height + height);
  ctx.lineTo(cell.x * width, cell.y * height);
  ctx.stroke();
}

// function renderObject(x: number, y: number, ctx: CanvasRenderingContext2D | null) {
//   if (!ctx) return;

//   ctx.beginPath();
//   ctx.fillStyle = "red";
//   ctx.fillRect(x - 2, y - 2, 4, 4);
//   ctx.stroke();
// }

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
  
  const array = new QuadArray(50, 30, window.innerWidth, window.innerHeight);

  // demo insert
  // for (let i = 0; i < 1000; i++) {
  //   tree.insert({
  //     x: Math.random() * (window.innerWidth - 20) + 10,
  //     y: Math.random() * (window.innerHeight - 20) + 10,
  //   });
  // }

  canvasTargetElem.onmousemove = (event) => {
    const { pageX, pageY } = event;
    targetCell = array.retrive(pageX, pageY);
    renderTargetCell(array.cellWidth, array.cellHeight, targetCell, ctxTarget);

    // targetNodes.childrens.forEach((child) => renderObject(child.x, child.y, ctxTarget));
  }

  renderArray(array, ctx);
  renderCounter(30000, 0);
}
