import type { INodeTypes } from 'mage-workflow';
import nock from 'nock';

import { executeWorkflow } from '@test/nodes/ExecuteWorkflow';
import { getResultNodeData, setup, workflowToTests } from '@test/nodes/Helpers';
import type { WorkflowTestData } from '@test/nodes/types';

import * as transport from '../../../../v2/transport/discord.api';

const discordApiRequestSpy = jest.spyOn(transport, 'discordApiRequest');

discordApiRequestSpy.mockImplementation(async (method: string, _) => {
	if (method === 'PATCH') {
		return {
			id: '1168516240332034067',
			type: 0,
			last_message_id: null,
			flags: 0,
			guild_id: '1168516062791340136',
			name: 'first-channel',
			parent_id: '1168516063340789831',
			rate_limit_per_user: 30,
			topic: 'This is channel topic',
			position: 3,
			permission_overwrites: [],
			nsfw: true,
		};
	}
});

describe('Test DiscordV2, channel => update', () => {
	const workflows = ['nodes/Discord/test/v2/node/channel/update.workflow.json'];
	const tests = workflowToTests(workflows);

	beforeAll(() => {
		nock.disableNetConnect();
	});

	afterAll(() => {
		nock.restore();
		jest.resetAllMocks();
	});

	const nodeTypes = setup(tests);

	const testNode = async (testData: WorkflowTestData, types: INodeTypes) => {
		const { result } = await executeWorkflow(testData, types);

		const resultNodeData = getResultNodeData(result, testData);

		resultNodeData.forEach(({ nodeName, resultData }) => {
			return expect(resultData).toEqual(testData.output.nodeData[nodeName]);
		});

		expect(discordApiRequestSpy).toHaveBeenCalledTimes(1);
		expect(discordApiRequestSpy).toHaveBeenCalledWith('PATCH', '/channels/1168516240332034067', {
			name: 'First Channel',
			nsfw: true,
			parent_id: '1168516063340789831',
			position: 3,
			rate_limit_per_user: 30,
			topic: 'This is channel topic',
		});

		expect(result.finished).toEqual(true);
	};

	for (const testData of tests) {
		test(testData.description, async () => await testNode(testData, nodeTypes));
	}
});