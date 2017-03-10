[![Build Status](https://travis-ci.org/alhugone/tslint-strict-null-checks.svg?branch=master)](https://travis-ci.org/alhugone/tslint-strict-null-checks)
[![Coverage Status](https://coveralls.io/repos/github/alhugone/tslint-strict-null-checks/badge.svg)](https://coveralls.io/github/alhugone/tslint-strict-null-checks)

# TsLint rules for unreliable implementation of strictNullChecks

## Installation

Install from npm to your devDependencies:

```sh
npm install --save-dev tslint-strict-null-checks 
```
Configure tslint to use the custom-tslint-rules folder:

Add the following path to the `rulesDirectory` setting in your `tslint.json` file:

```json
{
   "rulesDirectory": [
     "node_modules/tslint-strict-null-checks/dist"
   ],
   "rules": {
     ...
   }
}
```
## Usage

### Rule: `no-uninitialized`

Enforces initalization of variables and properties, when `undefined` is not in thier domain.

 ```json
"no-uninitialized": [true, "variables", "properties"]
 ```

## Support
If You find any gap where `undefined` can be smuggled please [open an issue](https://github.com/alhugone/tslint-strict-null-checks/issues/new).

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/alhugone/tslint-strict-null-checks/compare/).