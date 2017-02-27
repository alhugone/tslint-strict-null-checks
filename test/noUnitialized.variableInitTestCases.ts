export const testCases = [
    { source: `let x`, shouldWarn: true },
    { source: `let x = 1`, shouldWarn: false },
    { source: `function f() { let x }`, shouldWarn: true },
    { source: `function f() { let x = 1 }`, shouldWarn: false },
    { source: `let f = () => { let x }`, shouldWarn: true },
    { source: `let f = () => { let x = 1 }`, shouldWarn: false },
    {
        source: `class X {
            method = function() {
                let x;
            }`, shouldWarn: true
    },
    {
        source: `class X {
            method = function() {
                let x = 1;
            }`, shouldWarn: false
    },
    { source: `let f: undefined`, shouldWarn: false },
    { source: `let f: number | undefined`, shouldWarn: false },
    { source: `let f: number`, shouldWarn: true },
    { source: `let f: {}`, shouldWarn: true },
    { source: `let f: {} | undefined`, shouldWarn: false },
    { source: `let f: null`, shouldWarn: true },
    { source: `let f: number | null`, shouldWarn: true },
    { source: `let f: number | null | undefined`, shouldWarn: false },
    { source: `let f: number | null | undefined`, shouldWarn: false },
    { source: `let a, b, c `, shouldWarn: true },
    { source: `let a=1, b=2, c `, shouldWarn: true },
    { source: `let a=1, b=2, c =3`, shouldWarn: false },
];
