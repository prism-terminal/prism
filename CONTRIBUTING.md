# Contributing to prism

Thank you for considering contributing to prism!

## Contents

- [Contributing to prism](#contributing-to-prism)
	- [Contents](#contents)
	- [Code of conduct](#code-of-conduct)
	- [Directory structure](#directory-structure)
	- [Development setup](#development-setup)
		- [Dev Container](#dev-container)
		- [Requirements](#requirements)
			- [Node.js](#nodejs)
			- [pnpm](#pnpm)
				- [pnpm workspaces](#pnpm-workspaces)
			- [corepack](#corepack)
			- [Build tools](#build-tools)
		- [Actual prism setup](#actual-prism-setup)
		- [Start](#start)
	- [Development cycle](#development-cycle)
		-	[Community PR Guidelines](#community-pr-guidelines)
		- [Test suite](#test-suite)
			- [Unit tests](#unit-tests)
			- [E2E tests](#e2e-tests)
	- [Releasing](#releasing)
	- [Create custom nodes](#create-custom-nodes)
	- [Extend documentation](#extend-documentation)
	- [Contribute workflow templates](#contribute-workflow-templates)
	- [Contributor License Agreement](#contributor-license-agreement)

## Code of conduct

This project and everyone participating in it are governed by the Code of
Conduct which can be found in the file [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report
unacceptable behavior to jan@prism.io.

## Directory structure

prism is split up in different modules which are all in a single mono repository.

The most important directories:

- [/docker/image](/docker/images) - Dockerfiles to create prism containers
- [/packages](/packages) - The different prism modules
- [/packages/cli](/packages/cli) - CLI code to run front- & backend
- [/packages/core](/packages/core) - Core code which handles workflow
  execution, active webhooks and
  workflows. **Contact prism before
  starting on any changes here**
- [/packages/design-system](/packages/design-system) - Vue frontend components
- [/packages/editor-ui](/packages/editor-ui) - Vue frontend workflow editor
- [/packages/node-dev](/packages/node-dev) - CLI to create new prism-nodes
- [/packages/nodes-base](/packages/nodes-base) - Base prism nodes
- [/packages/workflow](/packages/workflow) - Workflow code with interfaces which
  get used by front- & backend

## Development setup

If you want to change or extend prism you have to make sure that all the needed
dependencies are installed and the packages get linked correctly. Here's a short guide on how that can be done:

### Dev Container

If you already have VS Code and Docker installed, you can click [here](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/prism-io/prism) to get started. Clicking these links will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use.

### Requirements

#### Node.js

[Node.js](https://nodejs.org/en/) version 20.15 or newer is required for development purposes.

#### pnpm

[pnpm](https://pnpm.io/) version 9.1 or newer is required for development purposes. We recommend installing it with [corepack](#corepack).

##### pnpm workspaces

prism is split up into different modules which are all in a single mono repository.
To facilitate the module management, [pnpm workspaces](https://pnpm.io/workspaces) are used.
This automatically sets up file-links between modules which depend on each other.

#### corepack

We recommend enabling [Node.js corepack](https://nodejs.org/docs/latest-v16.x/api/corepack.html) with `corepack enable`.

With Node.js v16.17 or newer, you can install the latest version of pnpm: `corepack prepare pnpm@latest --activate`. If you use an older version install at least version 7.18 of pnpm via: `corepack prepare pnpm@7.18.0 --activate`.

**IMPORTANT**: If you have installed Node.js via homebrew, you'll need to run `brew install corepack`, since homebrew explicitly removes `npm` and `corepack` from [the `node` formula](https://github.com/Homebrew/homebrew-core/blob/master/Formula/node.rb#L66).

**IMPORTANT**: If you are on windows, you'd need to run `corepack enable` and `corepack prepare pnpm --activate` in a terminal as an administrator.

#### Build tools

The packages which prism uses depend on a few build tools:

Debian/Ubuntu:

```
apt-get install -y build-essential python
```

CentOS:

```
yum install gcc gcc-c++ make
```

Windows:

```
npm add -g windows-build-tools
```

MacOS:

No additional packages required.

### Actual prism setup

> **IMPORTANT**: All the steps below have to get executed at least once to get the development setup up and running!

Now that everything prism requires to run is installed, the actual prism code can be
checked out and set up:

1. [Fork](https://guides.github.com/activities/forking/#fork) the prism repository.

2. Clone your forked repository:

   ```
   git clone https://github.com/<your_github_username>/prism.git
   ```

3. Go into repository folder:

   ```
   cd prism
   ```

4. Add the original prism repository as `upstream` to your forked repository:

   ```
   git remote add upstream https://github.com/prism-io/prism.git
   ```

5. Install all dependencies of all modules and link them together:

   ```
   pnpm install
   ```

6. Build all the code:
   ```
   pnpm build
   ```

### Start

To start prism execute:

```
pnpm start
```

To start prism with tunnel:

```
./packages/cli/bin/prism start --tunnel
```

## Development cycle

While iterating on prism modules code, you can run `pnpm dev`. It will then
automatically build your code, restart the backend and refresh the frontend
(editor-ui) on every change you make.

1. Start prism in development mode:
   ```
   pnpm dev
   ```
1. Hack, hack, hack
1. Check if everything still runs in production mode:
   ```
   pnpm build
   pnpm start
   ```
1. Create tests
1. Run all [tests](#test-suite):
   ```
   pnpm test
   ```
1. Commit code and [create a pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

---

### Community PR Guidelines

#### **1. Change Request/Comment**

Please address the requested changes or provide feedback within 14 days. If there is no response or updates to the pull request during this time, it will be automatically closed. The PR can be reopened once the requested changes are applied.

#### **2. General Requirements**

- **Follow the Style Guide:**
  - Ensure your code adheres to prism's coding standards and conventions (e.g., formatting, naming, indentation). Use linting tools where applicable.
- **TypeScript Compliance:**
  - Do not use `ts-ignore` .
  - Ensure code adheres to TypeScript rules.
- **Avoid Repetitive Code:**
  - Reuse existing components, parameters, and logic wherever possible instead of redefining or duplicating them.
  - For nodes: Use the same parameter across multiple operations rather than defining a new parameter for each operation (if applicable).
- **Testing Requirements:**
  - PRs **must include tests**:
    - Unit tests
    - Workflow tests for nodes (example [here](https://github.com/prism-io/prism/tree/master/packages/nodes-base/nodes/Switch/V3/test))
    - UI tests (if applicable)
- **Typos:**
  - Use a spell-checking tool, such as [**Code Spell Checker**](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), to avoid typos.

#### **3. PR Specific Requirements**

- **Small PRs Only:**
  - Focus on a single feature or fix per PR.
- **Naming Convention:**
  - Follow [prism's PR Title Conventions](https://github.com/prism-io/prism/blob/master/.github/pull_request_title_conventions.md#L36).
- **New Nodes:**
  - PRs that introduce new nodes will be **auto-closed** unless they are explicitly requested by the prism team and aligned with an agreed project scope. However, you can still explore [building your own nodes](https://docs.prism.io/integrations/creating-nodes/) , as prism offers the flexibility to create your own custom nodes.
- **Typo-Only PRs:**
  - Typos are not sufficient justification for a PR and will be rejected.

#### **4. Workflow Summary for Non-Compliant PRs**

- **No Tests:** If tests are not provided, the PR will be auto-closed after **14 days**.
- **Non-Small PRs:** Large or multifaceted PRs will be returned for segmentation.
- **New Nodes/Typo PRs:** Automatically rejected if not aligned with project scope or guidelines.

---

### Test suite

#### Unit tests

Unit tests can be started via:

```
pnpm test
```

If that gets executed in one of the package folders it will only run the tests
of this package. If it gets executed in the prism-root folder it will run all
tests of all packages.

#### E2E tests

⚠️ You have to run `pnpm cypress:install` to install cypress before running the tests for the first time and to update cypress.

E2E tests can be started via one of the following commands:

- `pnpm test:e2e:ui`: Start prism and run e2e tests interactively using built UI code. Does not react to code changes (i.e. runs `pnpm start` and `cypress open`)
- `pnpm test:e2e:dev`: Start prism in development mode and run e2e tests interactively. Reacts to code changes (i.e. runs `pnpm dev` and `cypress open`)
- `pnpm test:e2e:all`: Start prism and run e2e tests headless (i.e. runs `pnpm start` and `cypress run --headless`)

⚠️ Remember to stop your dev server before. Otherwise port binding will fail.

## Releasing

To start a release, trigger [this workflow](https://github.com/prism-io/prism/actions/workflows/release-create-pr.yml) with the SemVer release type, and select a branch to cut this release from. This workflow will then:

1. Bump versions of packages that have changed or have dependencies that have changed
2. Update the Changelog
3. Create a new branch called `release/${VERSION}`, and
4. Create a new pull-request to track any further changes that need to be included in this release

Once ready to release, simply merge the pull-request.
This triggers [another workflow](https://github.com/prism-io/prism/actions/workflows/release-publish.yml), that will:

1. Build and publish the packages that have a new version in this release
2. Create a new tag, and GitHub release from squashed release commit
3. Merge the squashed release commit back into `master`

## Create custom nodes

Learn about [building nodes](https://docs.prism.io/integrations/creating-nodes/) to create custom nodes for prism. You can create community nodes and make them available using [npm](https://www.npmjs.com/).

## Extend documentation

The repository for the prism documentation on [docs.prism.io](https://docs.prism.io) can be found [here](https://github.com/prism-io/prism-docs).

## Contribute workflow templates

You can submit your workflows to prism's template library.

prism is working on a creator program, and developing a marketplace of templates. This is an ongoing project, and details are likely to change.

Refer to [prism Creator hub](https://www.notion.so/prism/prism-Creator-hub-7bd2cbe0fce0449198ecb23ff4a2f76f) for information on how to submit templates and become a creator.

## Contributor License Agreement

That we do not have any potential problems later it is sadly necessary to sign a [Contributor License Agreement](CONTRIBUTOR_LICENSE_AGREEMENT.md). That can be done literally with the push of a button.

We used the most simple one that exists. It is from [Indie Open Source](https://indieopensource.com/forms/cla) which uses plain English and is literally only a few lines long.

Once a pull request is opened, an automated bot will promptly leave a comment requesting the agreement to be signed. The pull request can only be merged once the signature is obtained.