// Quick verification of Luhn algorithm
function calculateLuhnCheckDigit(number: string): number {
    let sum = 0;
    const reversedDigits = number.split('').reverse();

    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = parseInt(reversedDigits[i]);

        // Double every second digit (odd position in reversed string)
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    return (10 - (sum % 10)) % 10;
}

// Test cases
const testCases = [
    { base: "2813000000005072", expected: "8", customerId: "5072" },
    { base: "2813000000000013", expected: "7", customerId: "13" },
    { base: "2813000000000004", expected: "6", customerId: "4" },
    { base: "2813000000011180", expected: "1", customerId: "11180" },
    { base: "2813000000000187", expected: "9", customerId: "187" }
];

console.log("Luhn Algorithm Verification:");
console.log("============================");

testCases.forEach(testCase => {
    const calculated = calculateLuhnCheckDigit(testCase.base);
    const match = calculated.toString() === testCase.expected;

    console.log(`Customer ID: ${testCase.customerId}`);
    console.log(`Base: ${testCase.base}`);
    console.log(`Expected check digit: ${testCase.expected}`);
    console.log(`Calculated check digit: ${calculated}`);
    console.log(`Match: ${match ? '✅' : '❌'}`);
    console.log(`Full EasyPay: 9${testCase.base}${calculated}`);
    console.log("---");
});

export { calculateLuhnCheckDigit };
