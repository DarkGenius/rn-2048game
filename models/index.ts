export const ROW_SIZE = 4;
export const CELLS_COUNT = ROW_SIZE*ROW_SIZE;

export type CellValue = number | null;

export interface FieldModel {
    cells: CellValue[];
}

export enum ShiftDirection {
    Up,
    Right,
    Down,
    Left,
}