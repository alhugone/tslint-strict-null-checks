import * as tslint from 'tslint';
import * as variableInit from './noUnitialized.variableInitTestCases';

describe('no-uninitialized-non-undefined-var', () => {
    variableInit.testCases.forEach(function (test) {
        it(`when variable of non-undefined type is not initialized when declared, should return failure: ${test.source}`, () => {
            let result: tslint.LintResult = lint(test.source, ['variable']);
            expect(result.failureCount !== 0).toBe(test.shouldWarn, 'Incorrect lint result');
        });
    });
});

function lint(source: string, options: string[]): tslint.LintResult {
    let linterOptions: tslint.ILinterOptions = {
        fix: false,
        formatter: 'json',
        formattersDirectory: undefined,
        rulesDirectory: './dist/src',
    };
    let configuration = {
        rules: {
            'no-uninitialized': [true, ...options]
        },
    };
    let linter = new tslint.Linter(linterOptions, undefined);
    linter.lint('File.ts', source, configuration);
    return linter.getResult();
}
