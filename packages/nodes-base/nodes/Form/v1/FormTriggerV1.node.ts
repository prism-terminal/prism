import {
	FORM_TRIGGER_PATH_IDENTIFIER,
	NodeConnectionType,
	type INodeType,
	type INodeTypeBaseDescription,
	type INodeTypeDescription,
	type IWebhookFunctions,
} from 'mage-workflow';

import {
	formDescription,
	formFields,
	formRespondMode,
	formTitle,
	formTriggerPanel,
	webhookPath,
} from '../common.descriptions';
import { formWebhook } from '../utils';

const descriptionV1: INodeTypeDescription = {
	displayName: 'mage Form Trigger',
	name: 'formTrigger',
	icon: 'file:form.svg',
	group: ['trigger'],
	version: 1,
	description: 'Generate webforms in mage and pass their responses to the workflow',
	defaults: {
		name: 'mage Form Trigger',
	},

	inputs: [],
	outputs: [NodeConnectionType.Main],
	webhooks: [
		{
			name: 'setup',
			httpMethod: 'GET',
			responseMode: 'onReceived',
			isFullPath: true,
			path: `={{$parameter["path"]}}/${FORM_TRIGGER_PATH_IDENTIFIER}`,
			ndvHideUrl: true,
		},
		{
			name: 'default',
			httpMethod: 'POST',
			responseMode: '={{$parameter["responseMode"]}}',
			responseData: '={{$parameter["responseMode"] === "lastNode" ? "noData" : undefined}}',
			isFullPath: true,
			path: `={{$parameter["path"]}}/${FORM_TRIGGER_PATH_IDENTIFIER}`,
			ndvHideMethod: true,
		},
	],
	eventTriggerDescription: 'Waiting for you to submit the form',
	activationMessage: 'You can now make calls to your production Form URL.',
	triggerPanel: formTriggerPanel,
	properties: [
		webhookPath,
		formTitle,
		formDescription,
		formFields,
		formRespondMode,
		{
			displayName: 'Options',
			name: 'options',
			type: 'collection',
			placeholder: 'Add option',
			default: {},
			displayOptions: {
				hide: {
					responseMode: ['responseNode'],
				},
			},
			options: [
				{
					displayName: 'Form Submitted Text',
					name: 'formSubmittedText',
					description: 'The text displayed to users after they filled the form',
					type: 'string',
					default: 'Your response has been recorded',
				},
			],
		},
	],
};

export class FormTriggerV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...descriptionV1,
		};
	}

	async webhook(this: IWebhookFunctions) {
		return await formWebhook(this);
	}
}
