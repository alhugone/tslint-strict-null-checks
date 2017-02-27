export const testCases = [
    {
        source:
        `class X1 {
            prop1: string;
        }`,
        shouldWarn: true
    },
    {
        source:
        `class X1 {
            prop1: string = '';
        }`,
        shouldWarn: false
    },
    {
        source:
        `class X1 {
            prop1?: string;
        }`,
        shouldWarn: false
    },
    {
        source:
        `class X1 {
            prop1: string;
            constructor() { }
        }`,
        shouldWarn: true
    },
    {
        source:
        `class X1 {
            prop1: string;
            constructor() {
                this.prop1 = '';
            }
        }`,
        shouldWarn: false
    },
    {
        source:
        `class X1 {
            prop1: string | undefined;
        }`,
        shouldWarn: false
    },
    {
        source:
        `class X1 {
            prop1: string | null;
        }`,
        shouldWarn: true
    },
    {
        source:
        `abstract class X1 {
            prop1: string;
        }`,
        shouldWarn: true
    },
    {
        source:
        `abstract class X1 {
            prop1: string;
            constructor() {
                this.prop1 = '';
            }
        }`,
        shouldWarn: false
    },
];

class X1 {
    prop1: string;
    constructor() {

    }
}