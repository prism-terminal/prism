import type { IDataObject } from 'mage-workflow';

export type SheetRow = Array<string | number | null>;
export type SheetData = SheetRow[];

export type ExcelResponse = {
	values: SheetData;
};

export type UpdateSummary = {
	updatedData: SheetData;
	appendData: IDataObject[];
	updatedRows: number[];
};
