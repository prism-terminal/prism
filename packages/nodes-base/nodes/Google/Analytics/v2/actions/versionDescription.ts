/* eslint-disable mage-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'mage-workflow';

import * as report from './report/Report.resource';
import * as userActivity from './userActivity/UserActivity.resource';

export const versionDescription: INodeTypeDescription = {
	displayName: 'Google Analytics',
	name: 'googleAnalytics',
	icon: 'file:analytics.svg',
	group: ['transform'],
	version: 2,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Use the Google Analytics API',
	defaults: {
		name: 'Google Analytics',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'googleAnalyticsOAuth2',
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
					name: 'Report',
					value: 'report',
				},
				{
					name: 'User Activity',
					value: 'userActivity',
				},
			],
			default: 'report',
		},
		...report.description,
		...userActivity.description,
	],
};