export const testCases = [
    { shouldWarn: false,
      source: `
        const my_list = [5, 6, 7];
        for (const val of my_list) {
            console.log(val);
        }`, 
    },
    { shouldWarn: false,
      source: `
        const my_list = [5, 6, 7];
        for (const val in my_list) {
            console.log(val);
        }`, 
    },
    { shouldWarn: false,
      source: `
        for (var val:string, k = 1; k<10;k++) {
            console.log(val);
        }`, 
    },
];
