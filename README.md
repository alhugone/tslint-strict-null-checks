[![npm version](https://badge.fury.io/js/tslint-strict-null-checks.svg)](https://badge.fury.io/js/tslint-strict-null-checks)
[![Build Status](https://travis-ci.org/alhugone/tslint-strict-null-checks.svg?branch=master)](https://travis-ci.org/alhugone/tslint-strict-null-checks)
[![Coverage Status](https://coveralls.io/repos/github/alhugone/tslint-strict-null-checks/badge.svg)](https://coveralls.io/github/alhugone/tslint-strict-null-checks)

# TsLint rules preventing undefined leaks in strictNullChecks mode

TypeScript (latest release 2.4.1) strictNullChecks is not reliable. It does not work as it should at least in two basic cases. It does not enforce initialization of varaiables and properties, so they will be `undefined`, even if `undefined` is not in the domian.

Code that (should not) compiles in strictNullChecks:
```typescript
class X {
    public x: number;
}

let x: number;
function f(): number {
    return x;
}

let m: number = f();
let c: X = new X();
console.log(`m: ${m}`);
console.log(`c.x: ${c.x}`);
```

results in:

```sh
m: undefined
c.x: undefined
```

With ts-strict-null-checks You will be warned about not initialized variables and properties.

## Installation

Install from npm to your devDependencies:

```sh
npm install --save-dev tslint-strict-null-checks
```
Configure tslint to use the tslint-strict-null-checks folder. Add the following path to the `rulesDirectory` setting in your `tslint.json` file:

```json
{
   "rulesDirectory": [
     "node_modules/tslint-strict-null-checks/rules"
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
