import * as tslint from 'tslint';

export function lint(source: string, options: string[]): tslint.LintResult {
    let linterOptions: tslint.ILinterOptions = {
        fix: false,
        formatter: 'json',
        formattersDirectory: undefined,
        rulesDirectory: './dist/src',
    };
    let configuration = {
        rules: {
            'no-uninitialized': [true, ...options],
        },
    };
    let linter = new tslint.Linter(linterOptions, undefined);
    linter.lint('File.ts', source, configuration);
    return linter.getResult();
}
