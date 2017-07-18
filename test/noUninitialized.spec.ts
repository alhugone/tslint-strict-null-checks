import * as tslint from 'tslint';
import { lint } from './helper';
import * as propertyInit from './noUninitialized.propertyInitTestCases';
import * as variableInit from './noUninitialized.variableInitTestCases';
import * as catchBlock from './noUninitialized.variableInitTestCases.catch.block';
import * as variableInitInForStatement from './noUninitialized.variableInitTestCases.for.statements';

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

    catchBlock.testCases.forEach(function (test) {
        it(`when variable is declared in catch clause, should return failure: ${test.source}`, () => {
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
