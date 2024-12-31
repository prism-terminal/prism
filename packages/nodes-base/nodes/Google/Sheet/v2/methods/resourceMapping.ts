import type {
	IDataObject,
	ILoadOptionsFunctions,
	ResourceMapperField,
	ResourceMapperFields,
} from 'mage-workflow';

import { GoogleSheet } from '../helpers/GoogleSheet';
import { ROW_NUMBER, type ResourceLocator } from '../helpers/GoogleSheets.types';
import { getSpreadsheetId } from '../helpers/GoogleSheets.utils';

export async function getMappingColumns(
	this: ILoadOptionsFunctions,
): Promise<ResourceMapperFields> {
	const documentId = this.getNodeParameter('documentId', 0) as IDataObject | null;

	if (!documentId) return { fields: [] };

	const { mode, value } = documentId;

	const spreadsheetId = getSpreadsheetId(this.getNode(), mode as ResourceLocator, value as string);

	const sheet = new GoogleSheet(spreadsheetId, this);
	const sheetWithinDocument = this.getNodeParameter('sheetName', undefined, {
		extractValue: true,
	}) as string;
	const { mode: sheetMode } = this.getNodeParameter('sheetName', 0) as { mode: ResourceLocator };

	const { title: sheetName } = await sheet.spreadsheetGetSheet(
		this.getNode(),
		sheetMode,
		sheetWithinDocument,
	);
	const sheetData = await sheet.getData(`${sheetName}!1:1`, 'FORMATTED_VALUE');

	const columns = sheet.testFilter(sheetData || [], 0, 0).filter((col) => col !== '');

	const fields: ResourceMapperField[] = columns.map((col) => ({
		id: col,
		displayName: col,
		required: false,
		defaultMatch: col === 'id',
		display: true,
		type: 'string',
		canBeUsedToMatch: true,
	}));

	const operation = this.getNodeParameter('operation', 0) as string;

	if (operation === 'update') {
		fields.push({
			id: ROW_NUMBER,
			displayName: ROW_NUMBER,
			required: false,
			defaultMatch: false,
			display: true,
			type: 'string',
			canBeUsedToMatch: true,
			readOnly: true,
			removed: true,
		});
	}

	return { fields };
}
