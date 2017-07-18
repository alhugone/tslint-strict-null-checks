import * as tslint from 'tslint';
import { lint } from './helper';
import * as propertyInit from './noUnitialized.propertyInitTestCases';
import * as variableInit from './noUnitialized.variableInitTestCases';
import * as variableInitInForStatement from './noUnitialized.variableInitTestCases.for.statements';

describe('no-uninitialized variables', () => {

    variableInit.testCases.forEach(function (test) {
        it(`when declared variable of non-undefined type is not explicitly initialized, should return failure: ${test.source}`, () => {
            let result: tslint.LintResult = lint(test.source, ['variables']);
            expect(result.errorCount !== 0).toBe(test.shouldWarn, 'Incorrect lint result');
        });
    });

    variableInitInForStatement.testCases.forEach(function (test) {
        it(`when declared variable of non-undefined type is used in for statement, should return failure: ${test.source}`, () => {
            let result: tslint.LintResult = lint(test.source, ['variables']);
            expect(result.errorCount !== 0).toBe(test.shouldWarn, 'Incorrect lint result');
        });
    });
});

describe('no-uninitialized properties', () => {

    propertyInit.testCases.forEach(function (test) {
        it(`when class property of non-undefined type is not explicitly initialized, should return failure: ${test.source}`, () => {
            let result: tslint.LintResult = lint(test.source, ['properties']);
            expect(result.errorCount !== 0).toBe(test.shouldWarn, 'Incorrect lint result');
        });
    });
});
