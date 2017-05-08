export const testCases = [
    { shouldWarn: false,
      source: `
        const my_list = [5, 6, 7];
        for (const val of my_list) {
            console.log(val);
        }`, 
    },
];
