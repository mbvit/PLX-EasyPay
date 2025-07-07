import { EasyPayGenerator } from './lib/easypay-generator';

/**
 * Example usage of the EasyPayGenerator class
 */

// Example 1: Generate an EasyPay number for a customer
const customerId = '12345';
const easyPayNumber = EasyPayGenerator.generate(customerId);
console.log(`Customer ID: ${customerId}`);
console.log(`EasyPay Number: ${easyPayNumber}`);
console.log(`Formatted: ${EasyPayGenerator.formatForDisplay(easyPayNumber)}`);

// Example 2: Validate an EasyPay number
const isValid = EasyPayGenerator.validate(easyPayNumber);
console.log(`Is valid: ${isValid}`);

// Example 3: Parse an EasyPay number
const parsed = EasyPayGenerator.parseEasyPayNumber(easyPayNumber);
if (parsed) {
    console.log('Parsed components:', parsed);
}

// Example 4: Get configuration
console.log(`Receiver ID: ${EasyPayGenerator.getReceiverId()}`);
console.log(`Total Length: ${EasyPayGenerator.getTotalLength()}`);

// Example 5: Working with different customer IDs
const customerIds = ['1', '123', '123456789', '987654321'];
customerIds.forEach(id => {
    try {
        const number = EasyPayGenerator.generate(id);
        console.log(`${id} -> ${number} (${number.length} digits)`);
    } catch (error) {
        console.log(`${id} -> Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

export {
    EasyPayGenerator
};
