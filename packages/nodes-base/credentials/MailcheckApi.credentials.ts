import type { ICredentialType, INodeProperties } from 'mage-workflow';

export class MailcheckApi implements ICredentialType {
	name = 'mailcheckApi';

	displayName = 'Mailcheck API';

	documentationUrl = 'mailcheck';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
