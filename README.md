pvrns
=====

Prs that we see, songs we don&#39;t know 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pvrns.svg)](https://npmjs.org/package/pvrns)
[![Downloads/week](https://img.shields.io/npm/dw/pvrns.svg)](https://npmjs.org/package/pvrns)
[![License](https://img.shields.io/npm/l/pvrns.svg)](https://github.com/sirgalleto/prs-vemos-rolas-no-sabemos/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pvrns
export NODE_PATH="$(npm config get prefix)/lib/node_modules" // Add this into your profile
$ pvrns COMMAND
running command...
$ pvrns (-v|--version|version)
pvrns/0.2.0 darwin-x64 node-v8.10.0
$ pvrns --help [COMMAND]
USAGE
  $ pvrns COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pvrns create-playlist [START-COMMIT] [END-COMMIT]`](#pvrns-create-playlist-start-commit-end-commit)
* [`pvrns help [COMMAND]`](#pvrns-help-command)
* [`pvrns install`](#pvrns-install)
* [`pvrns set-credentials`](#pvrns-set-credentials)

## `pvrns create-playlist [START-COMMIT] [END-COMMIT]`

creates a playlist with the music between <start-commit> and <end-commit>

```
USAGE
  $ pvrns create-playlist [START-COMMIT] [END-COMMIT]

EXAMPLE
  $ pvrns create-playlist 16c97ebcf6ce27bf23781e37515b6bd91a66fddf 724e9967c73ba42d0aab2fabd1a7c70590e62d5c
```

_See code: [dist/commands/create-playlist.ts](https://github.com/sirgalleto/prs-vemos-rolas-no-sabemos/blob/v0.2.0/dist/commands/create-playlist.ts)_

## `pvrns help [COMMAND]`

display help for pvrns

```
USAGE
  $ pvrns help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `pvrns install`

install the post-commit hook that saves the music metadata

```
USAGE
  $ pvrns install

EXAMPLE
  $ pvrns install
```

_See code: [dist/commands/install.ts](https://github.com/sirgalleto/prs-vemos-rolas-no-sabemos/blob/v0.2.0/dist/commands/install.ts)_

## `pvrns set-credentials`

adds spotify application credentials

```
USAGE
  $ pvrns set-credentials

EXAMPLE
  $ pvrns login
```

_See code: [dist/commands/set-credentials.ts](https://github.com/sirgalleto/prs-vemos-rolas-no-sabemos/blob/v0.2.0/dist/commands/set-credentials.ts)_
<!-- commandsstop -->
