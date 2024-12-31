/* eslint-disable mage-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'mage-workflow';

import * as alert from './alert';
import * as report from './report';
import * as search from './search';
import * as user from './user';

export const versionDescription: INodeTypeDescription = {
	displayName: 'Splunk',
	name: 'splunk',
	icon: 'file:splunk.svg',
	group: ['transform'],
	version: 2,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Consume the Splunk Enterprise API',
	defaults: {
		name: 'Splunk',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'splunkApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Alert',
					value: 'alert',
				},
				{
					name: 'Report',
					value: 'report',
				},
				{
					name: 'Search',
					value: 'search',
				},
				{
					name: 'User',
					value: 'user',
				},
			],
			default: 'search',
		},

		...alert.description,
		...report.description,
		...search.description,
		...user.description,
	],
};