import * as tslint from 'tslint';
import * as TestCase from './noUnitialized.variableInitTestCases';

describe('no-uninitialized-non-undefined-var', () => {
    TestCase.variableInitialization.forEach(function (test) {
        it(`when variable of non-undefined type is not initialized when declared, should return failure: ${test.source}`, () => {
            let result: tslint.LintResult = lint(test.source);
            expect(result.failureCount !== 0).toBe(test.shouldWarn, 'Incorrect lint result');
        });
    });
});

function lint(source: string): tslint.LintResult {
    let linterOptions: tslint.ILinterOptions = {
        fix: false,
        formatter: 'json',
        formattersDirectory: undefined,
        rulesDirectory: './dist/src',
    };
    let configuration = {
        rules: {
            'no-uninitialized': [true, 'variable']
        },
    };
    let linter = new tslint.Linter(linterOptions, undefined);
    linter.lint('File.ts', source, configuration);
    return linter.getResult();
}
