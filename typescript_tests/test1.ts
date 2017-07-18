/*Should no compile*/

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