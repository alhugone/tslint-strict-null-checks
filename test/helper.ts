import * as tslint from 'tslint';
import { EMPTY_CONFIG } from 'tslint/lib/configuration';

export function lint(source: string, options: string[]): tslint.LintResult {
    let linterOptions: tslint.ILinterOptions = {
        fix: false,
        formatter: 'json',
        formattersDirectory: undefined,
        rulesDirectory: './dist/src',
    };
    let configuration = EMPTY_CONFIG;
    configuration.rules.set('no-uninitialized',
        {
            ruleArguments: [true, ...options],
            ruleName: 'no-uninitialized',
        },
    );
    let linter = new tslint.Linter(linterOptions, undefined);
    linter.lint('File.ts', source, configuration);
    return linter.getResult();
}
