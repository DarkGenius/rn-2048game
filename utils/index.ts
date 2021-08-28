import { CELLS_COUNT, CellValue, FieldModel, ROW_SIZE, ShiftDirection } from "../models";

export function randCell() {
    return Math.floor(Math.random()*CELLS_COUNT);
}

export function getCellByCoords(field: FieldModel, x: number, y: number): CellValue {
    if (x >= 0 && x < ROW_SIZE && y >= 0 && y < ROW_SIZE) {
        return field.cells[y*ROW_SIZE + x];
    }
    else {
        throw new Error('Coordinates out of bounds');
    }
}

export function getRow(cells: CellValue[], idx: number): CellValue[] {
    if (idx < 0 || idx >= ROW_SIZE)
        throw new Error('Our of range');
    
    return cells.slice(idx*ROW_SIZE, idx*ROW_SIZE + ROW_SIZE);
}

export function getAllRows(cells: CellValue[]): CellValue[][] {
    return new Array(ROW_SIZE).fill(0).map((_, idx) => getRow(cells, idx));
}

export function getAllCols(cells: CellValue[]): CellValue[][] {
    return new Array(ROW_SIZE).fill(0).map((_, idx) => getCol(cells, idx));
}

export function getCol(cells: CellValue[], idx: number): CellValue[] {
    if (idx < 0 || idx >= ROW_SIZE)
        throw new Error('Our of range');
    
    return cells.filter((_, i) => i % ROW_SIZE === idx);
}

export function getNewField(): FieldModel {
  const model: FieldModel = {
    cells: new Array(CELLS_COUNT).fill(null),
  };

  for (let i = 0; i < 2; ++i) {
    let c = 0;
    while (model.cells[(c = randCell())] !== null);
    model.cells[c] = 1 << (i + 1);
  }

  return model;
}

/**
 * Сдвигает клетки поля в заданном направлении
 * @param cells
 * @param direction 
 */
export function shiftField(cells: CellValue[], direction: ShiftDirection): CellValue[] {
    let arr: CellValue[][] = [];
    switch (direction) {
        case ShiftDirection.Right:
            arr = getAllRows(cells).map(row => shrinkList(row, 1));
            return Array.prototype.concat(...arr);
        case ShiftDirection.Left:
            arr = getAllRows(cells).map(row => shrinkList(row, -1));
            return Array.prototype.concat(...arr);
        case ShiftDirection.Down:
            arr = getAllCols(cells).map(col => shrinkList(col, 1))
            return arr.reduce((acc, _, i) => acc.concat(arr.map(l => l[i])), []);
        case ShiftDirection.Up:
            arr = getAllCols(cells).map(col => shrinkList(col, -1))
            return arr.reduce((acc, _, i) => acc.concat(arr.map(l => l[i])), []);
        default:
            return [];
    }
}

/**
 * Добавляет новую ячейку
 * @param cells 
 */
export function addCell(cells: CellValue[]): CellValue[] {
    let c = 0;
    while (cells[(c = randCell())] !== null);
    return cells.map((val, idx) => idx === c ? 2 : val);
}

/**
 * Попытаться сделать ход. Возвращает новые клетки поля и признак успешности хода
 * @param cells 
 * @param direction 
 * @returns 
 */
export function tryMakeMove(cells: CellValue[], direction: ShiftDirection): [CellValue[], boolean] {
    const newCells = shiftField(cells, direction);
    const hasChanges = !newCells.every((v,i ) => v === cells[i]);
    if (hasChanges) {
        return [addCell(newCells), true];
    }
    return [cells, false];
}

function shrinkList(cells: CellValue[], dir: 1|-1): CellValue[] {
    let result: CellValue[] = [];
    for (let x of cells.filter(x => x !== null)) {
        const l = result.length;
        if (result[l-1] === x) {
            result[l-1] = 2*x!;
            result.push(null);
        }
        else {
            result.push(x);
        }
    }
    result = result.filter(x => x !== null);
    if (dir == 1)
        return new Array(ROW_SIZE-result.length).fill(null).concat(result);
    else
        return result.concat(new Array(ROW_SIZE-result.length).fill(null));
}
