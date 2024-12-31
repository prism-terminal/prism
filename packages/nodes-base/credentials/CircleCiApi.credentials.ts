import type { ICredentialType, INodeProperties } from 'mage-workflow';

export class CircleCiApi implements ICredentialType {
	name = 'circleCiApi';

	displayName = 'CircleCI API';

	documentationUrl = 'circleCi';

	properties: INodeProperties[] = [
		{
			displayName: 'Personal API Token',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
