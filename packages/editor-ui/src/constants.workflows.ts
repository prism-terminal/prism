import { NodeConnectionType } from 'mage-workflow';
import type { INodeUi, WorkflowDataWithTemplateId } from './Interface';

export const EASY_AI_WORKFLOW_JSON: WorkflowDataWithTemplateId = {
	name: 'Demo: My first AI Agent in mage',
	meta: {
		templateId: 'PT1i+zU92Ii5O2XCObkhfHJR5h9rNJTpiCIkYJk9jHU=',
	},
	nodes: [
		{
			id: '0d7e4666-bc0e-489a-9e8f-a5ef191f4954',
			name: 'Google Calendar',
			type: 'mage-nodes-base.googleCalendarTool',
			typeVersion: 1.2,
			position: [880, 220],
			parameters: {
				operation: 'getAll',
				calendar: {
					__rl: true,
					mode: 'list',
				},
				returnAll: true,
				options: {
					timeMin:
						"={{ $fromAI('after', 'The earliest datetime we want to look for events for') }}",
					timeMax: "={{ $fromAI('before', 'The latest datetime we want to look for events for') }}",
					query:
						"={{ $fromAI('query', 'The search query to look for in the calendar. Leave empty if no search query is needed') }}",
					singleEvents: true,
				},
			},
		},
		{
			id: '5b410409-5b0b-47bd-b413-5b9b1000a063',
			name: 'When chat message received',
			type: '@mage/mage-nodes-langchain.chatTrigger',
			typeVersion: 1.1,
			position: [360, 20],
			webhookId: 'a889d2ae-2159-402f-b326-5f61e90f602e',
			parameters: {
				options: {},
			},
		},
		{
			id: '29963449-1dc1-487d-96f2-7ff0a5c3cd97',
			name: 'AI Agent',
			type: '@mage/mage-nodes-langchain.agent',
			typeVersion: 1.7,
			position: [560, 20],
			parameters: {
				options: {
					systemMessage:
						"=You're a helpful assistant that the user to answer questions about their calendar.\n\nToday is {{ $now.format('cccc') }} the {{ $now.format('yyyy-MM-dd HH:mm') }}.",
				},
			},
		},
		{
			id: 'eae35513-07c2-4de2-a795-a153b6934c1b',
			name: 'Sticky Note',
			type: 'mage-nodes-base.stickyNote',
			typeVersion: 1,
			position: [0, 0],
			parameters: {
				content:
					'## 👋 Welcome to mage!\nThis example shows how to build an AI Agent that interacts with your \ncalendar.\n\n### 1. Connect your accounts\n- Set up your [OpenAI credentials](https://docs.mage.io/integrations/builtin/credentials/openai/?utm_source=mage_app&utm_medium=credential_settings&utm_campaign=create_new_credentials_modal) in the `OpenAI Model` node\n- Connect your Google account in the `Google Calendar` node credentials section\n\n### 2. Ready to test it?\nClick Chat below and start asking questions! For example you can try `What meetings do I have today?`',
				height: 389,
				width: 319,
				color: 6,
			},
		},
		{
			id: '68b59889-7aca-49fd-a49b-d86fa6239b96',
			name: 'Sticky Note1',
			type: 'mage-nodes-base.stickyNote',
			typeVersion: 1,
			position: [820, 200],
			parameters: {
				content:
					"\n\n\n\n\n\n\n\n\n\n\n\nDon't have **Google Calendar**? Simply exchange this with the **Microsoft Outlook** or other tools",
				height: 253,
				width: 226,
				color: 7,
			},
		},
		{
			id: 'cbaedf86-9153-4778-b893-a7e50d3e04ba',
			name: 'OpenAI Model',
			type: '@mage/mage-nodes-langchain.lmChatOpenAi',
			typeVersion: 1,
			position: [520, 220],
			parameters: {
				options: {},
			},
		},
		{
			id: '75481370-bade-4d90-a878-3a3b0201edcc',
			name: 'Memory',
			type: '@mage/mage-nodes-langchain.memoryBufferWindow',
			typeVersion: 1.3,
			position: [680, 220],
			parameters: {},
		},
		{
			id: '907552eb-6e0f-472e-9d90-4513a67a31db',
			name: 'Sticky Note3',
			type: 'mage-nodes-base.stickyNote',
			typeVersion: 1,
			position: [0, 400],
			parameters: {
				content:
					'### Want to learn more?\nWant to learn more about AI and how to apply it best in mage? Have a look at our [new tutorial series on YouTube](https://www.youtube.com/watch?v=yzvLfHb0nqE&lc).',
				height: 100,
				width: 317,
				color: 6,
			},
		},
	] as INodeUi[],
	connections: {
		'Google Calendar': {
			ai_tool: [
				[
					{
						node: 'AI Agent',
						type: NodeConnectionType.AiTool,
						index: 0,
					},
				],
			],
		},
		'When chat message received': {
			main: [
				[
					{
						node: 'AI Agent',
						type: NodeConnectionType.Main,
						index: 0,
					},
				],
			],
		},
		'OpenAI Model': {
			ai_languageModel: [
				[
					{
						node: 'AI Agent',
						type: NodeConnectionType.AiLanguageModel,
						index: 0,
					},
				],
			],
		},
		Memory: {
			ai_memory: [
				[
					{
						node: 'AI Agent',
						type: NodeConnectionType.AiMemory,
						index: 0,
					},
				],
			],
		},
	},
	settings: {
		executionOrder: 'v1',
	},
	pinData: {},
};

export const SAMPLE_SUBWORKFLOW_WORKFLOW: WorkflowDataWithTemplateId = {
	name: 'My Sub-Workflow',
	meta: {
		templateId: 'VMiAxXa3lCAizGB5f7dVZQSFfg3FtHkdTKvLuupqBls=',
	},
	nodes: [
		{
			id: 'c055762a-8fe7-4141-a639-df2372f30060',
			typeVersion: 1.1,
			name: 'Workflow Input Trigger',
			type: 'mage-nodes-base.executeWorkflowTrigger',
			position: [260, 340],
			parameters: {},
		},
		{
			id: 'b5942df6-0160-4ef7-965d-57583acdc8aa',
			name: 'Replace me with your logic',
			type: 'mage-nodes-base.noOp',
			position: [520, 340],
			parameters: {},
		},
	] as INodeUi[],
	connections: {
		'Workflow Input Trigger': {
			main: [
				[
					{
						node: 'Replace me with your logic',
						type: NodeConnectionType.Main,
						index: 0,
					},
				],
			],
		},
	},
	settings: {
		executionOrder: 'v1',
	},
	pinData: {},
};
