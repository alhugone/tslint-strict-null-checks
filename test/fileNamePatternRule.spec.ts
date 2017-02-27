import * as tslint from 'tslint';

describe('file-name-pattern', () => {
    const _pattern: string[] = ['\\w+sufix.ts$', '^prefix\\w+.ts$']
    const tests = [
        { fileName: 'abc.ts', shouldWarn: true },
        { fileName: 'sufix.ts', shouldWarn: true },
        { fileName: '1prefix1sufix1.ts', shouldWarn: true },
        { fileName: 'prefixTsufix.ts', shouldWarn: false },
        { fileName: 'prefixText.ts', shouldWarn: false },
        { fileName: 'Textsufix.ts', shouldWarn: false },
    ];

    tests.forEach(function (test) {
        it(`FileName: ${test.fileName} expected to fail: ${test.shouldWarn}`, () => {
            let result: tslint.LintResult = invoke(test.fileName, _pattern);
            expect(result.failureCount !== 0).toBe(test.shouldWarn);
        });
    });
});

function invoke(fileName: string, pattern: string[]): tslint.LintResult {
    let source = '';
    let linterOptions: tslint.ILinterOptions = {
        fix: false,
        formatter: 'json',
        formattersDirectory: undefined,
        rulesDirectory: './dist/src',
    };
    let configuration = {
        rules: {
            'file-name-pattern': [true, ...pattern],
        },
    };
    let linter = new tslint.Linter(linterOptions, undefined);
    linter.lint(fileName, source, configuration);
    return linter.getResult();
}
