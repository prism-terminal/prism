const sharedOptions = require('@mage_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@mage_io/eslint-config/node'],

	...sharedOptions(__dirname),

	ignorePatterns: ['index.js'],

	rules: {
		// TODO: remove all the following rules
		eqeqeq: 'warn',
		'id-denylist': 'warn',
		'import/extensions': 'warn',
		'prefer-spread': 'warn',
		'import/no-extraneous-dependencies': 'warn',

		'@typescript-eslint/naming-convention': ['error', { selector: 'memberLike', format: null }],
		'@typescript-eslint/no-explicit-any': 'warn', //812 warnings, better to fix in separate PR
		'@typescript-eslint/no-non-null-assertion': 'warn', //665 errors, better to fix in separate PR
		'@typescript-eslint/no-unsafe-assignment': 'warn', //7084 problems, better to fix in separate PR
		'@typescript-eslint/no-unsafe-call': 'warn', //541 errors, better to fix in separate PR
		'@typescript-eslint/no-unsafe-member-access': 'warn', //4591 errors, better to fix in separate PR
		'@typescript-eslint/no-unsafe-return': 'warn', //438 errors, better to fix in separate PR
		'@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
		'@typescript-eslint/restrict-template-expressions': 'warn', //1152 errors, better to fix in separate PR
		'@typescript-eslint/unbound-method': 'warn',
		'@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': true }],
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
		'@typescript-eslint/no-base-to-string': 'warn',
		'@typescript-eslint/no-redundant-type-constituents': 'warn',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/prefer-optional-chain': 'warn',
		'@typescript-eslint/restrict-plus-operands': 'warn',
		'@typescript-eslint/no-unnecessary-type-assertion': 'warn',
	},

	overrides: [
		{
			files: ['./credentials/*.ts'],
			plugins: ['eslint-plugin-mage-nodes-base'],
			rules: {
				'mage-nodes-base/cred-class-field-authenticate-type-assertion': 'error',
				'mage-nodes-base/cred-class-field-display-name-missing-oauth2': 'error',
				'mage-nodes-base/cred-class-field-display-name-miscased': 'error',
				'mage-nodes-base/cred-class-field-documentation-url-missing': 'error',
				'mage-nodes-base/cred-class-field-name-missing-oauth2': 'error',
				'mage-nodes-base/cred-class-field-name-unsuffixed': 'error',
				'mage-nodes-base/cred-class-field-name-uppercase-first-char': 'error',
				'mage-nodes-base/cred-class-field-properties-assertion': 'error',
				'mage-nodes-base/cred-class-field-type-options-password-missing': 'error',
				'mage-nodes-base/cred-class-name-missing-oauth2-suffix': 'error',
				'mage-nodes-base/cred-class-name-unsuffixed': 'error',
				'mage-nodes-base/cred-filename-against-convention': 'error',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-mage-nodes-base'],
			rules: {
				'mage-nodes-base/node-class-description-credentials-name-unsuffixed': 'error',
				'mage-nodes-base/node-class-description-display-name-unsuffixed-trigger-node': 'error',
				'mage-nodes-base/node-class-description-empty-string': 'error',
				'mage-nodes-base/node-class-description-icon-not-svg': 'error',
				'mage-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
				'mage-nodes-base/node-class-description-inputs-wrong-trigger-node': 'error',
				'mage-nodes-base/node-class-description-missing-subtitle': 'error',
				'mage-nodes-base/node-class-description-non-core-color-present': 'error',
				'mage-nodes-base/node-class-description-name-miscased': 'error',
				'mage-nodes-base/node-class-description-name-unsuffixed-trigger-node': 'error',
				'mage-nodes-base/node-class-description-outputs-wrong': 'off',
				'mage-nodes-base/node-dirname-against-convention': 'error',
				'mage-nodes-base/node-execute-block-double-assertion-for-items': 'error',
				'mage-nodes-base/node-execute-block-wrong-error-thrown': 'error',
				'mage-nodes-base/node-filename-against-convention': 'error',
				'mage-nodes-base/node-param-array-type-assertion': 'error',
				'mage-nodes-base/node-param-color-type-unused': 'error',
				'mage-nodes-base/node-param-default-missing': 'error',
				'mage-nodes-base/node-param-default-wrong-for-boolean': 'error',
				'mage-nodes-base/node-param-default-wrong-for-collection': 'error',
				'mage-nodes-base/node-param-default-wrong-for-fixed-collection': 'error',
				'mage-nodes-base/node-param-default-wrong-for-fixed-collection': 'error',
				'mage-nodes-base/node-param-default-wrong-for-multi-options': 'error',
				'mage-nodes-base/node-param-default-wrong-for-number': 'error',
				'mage-nodes-base/node-param-default-wrong-for-simplify': 'error',
				'mage-nodes-base/node-param-default-wrong-for-string': 'error',
				'mage-nodes-base/node-param-description-boolean-without-whether': 'error',
				'mage-nodes-base/node-param-description-comma-separated-hyphen': 'error',
				'mage-nodes-base/node-param-description-empty-string': 'error',
				'mage-nodes-base/node-param-description-excess-final-period': 'error',
				'mage-nodes-base/node-param-description-excess-inner-whitespace': 'error',
				'mage-nodes-base/node-param-description-identical-to-display-name': 'error',
				'mage-nodes-base/node-param-description-line-break-html-tag': 'error',
				'mage-nodes-base/node-param-description-lowercase-first-char': 'error',
				'mage-nodes-base/node-param-description-miscased-id': 'error',
				'mage-nodes-base/node-param-description-miscased-json': 'error',
				'mage-nodes-base/node-param-description-miscased-url': 'error',
				'mage-nodes-base/node-param-description-missing-final-period': 'error',
				'mage-nodes-base/node-param-description-missing-for-ignore-ssl-issues': 'error',
				'mage-nodes-base/node-param-description-missing-for-return-all': 'error',
				'mage-nodes-base/node-param-description-missing-for-simplify': 'error',
				'mage-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'error',
				'mage-nodes-base/node-param-description-missing-from-dynamic-options': 'error',
				'mage-nodes-base/node-param-description-missing-from-limit': 'error',
				'mage-nodes-base/node-param-description-unencoded-angle-brackets': 'error',
				'mage-nodes-base/node-param-description-unneeded-backticks': 'error',
				'mage-nodes-base/node-param-description-untrimmed': 'error',
				'mage-nodes-base/node-param-description-url-missing-protocol': 'error',
				'mage-nodes-base/node-param-description-weak': 'error',
				'mage-nodes-base/node-param-description-wrong-for-dynamic-multi-options': 'error',
				'mage-nodes-base/node-param-description-wrong-for-dynamic-options': 'error',
				'mage-nodes-base/node-param-description-wrong-for-ignore-ssl-issues': 'error',
				'mage-nodes-base/node-param-description-wrong-for-limit': 'error',
				'mage-nodes-base/node-param-description-wrong-for-return-all': 'error',
				'mage-nodes-base/node-param-description-wrong-for-simplify': 'error',
				'mage-nodes-base/node-param-description-wrong-for-upsert': 'error',
				'mage-nodes-base/node-param-display-name-excess-inner-whitespace': 'error',
				'mage-nodes-base/node-param-display-name-miscased-id': 'error',
				'mage-nodes-base/node-param-display-name-miscased': 'error',
				'mage-nodes-base/node-param-display-name-not-first-position': 'error',
				'mage-nodes-base/node-param-display-name-untrimmed': 'error',
				'mage-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options': 'error',
				'mage-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'error',
				'mage-nodes-base/node-param-display-name-wrong-for-simplify': 'error',
				'mage-nodes-base/node-param-display-name-wrong-for-update-fields': 'error',
				'mage-nodes-base/node-param-min-value-wrong-for-limit': 'error',
				'mage-nodes-base/node-param-multi-options-type-unsorted-items': 'error',
				'mage-nodes-base/node-param-name-untrimmed': 'error',
				'mage-nodes-base/node-param-operation-option-action-wrong-for-get-many': 'error',
				'mage-nodes-base/node-param-operation-option-description-wrong-for-get-many': 'error',
				'mage-nodes-base/node-param-operation-option-without-action': 'error',
				'mage-nodes-base/node-param-operation-without-no-data-expression': 'error',
				'mage-nodes-base/node-param-option-description-identical-to-name': 'error',
				'mage-nodes-base/node-param-option-name-containing-star': 'error',
				'mage-nodes-base/node-param-option-name-duplicate': 'error',
				'mage-nodes-base/node-param-option-name-wrong-for-get-many': 'error',
				'mage-nodes-base/node-param-option-name-wrong-for-upsert': 'error',
				'mage-nodes-base/node-param-option-value-duplicate': 'error',
				'mage-nodes-base/node-param-options-type-unsorted-items': 'error',
				'mage-nodes-base/node-param-placeholder-miscased-id': 'error',
				'mage-nodes-base/node-param-placeholder-missing-email': 'error',
				'mage-nodes-base/node-param-required-false': 'error',
				'mage-nodes-base/node-param-resource-with-plural-option': 'error',
				'mage-nodes-base/node-param-resource-without-no-data-expression': 'error',
				'mage-nodes-base/node-param-type-options-missing-from-limit': 'error',
				'mage-nodes-base/node-param-type-options-password-missing': 'error',
			},
		},
		{
			files: ['**/*.test.ts', '**/test/**/*.ts'],
			rules: {
				'import/no-extraneous-dependencies': 'off',
			},
		},
	],
};
