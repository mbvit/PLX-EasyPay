import { EasyPayGenerator } from './lib/easypay-generator';

/**
 * Test the EasyPayGenerator with the examples from the specification
 */
function testEasyPayGenerator() {
    console.log('Testing EasyPayGenerator...\n');

    // Test 1: Basic generation
    console.log('=== Test 1: Basic Generation ===');
    const customerId1 = '12345';
    const easyPayNumber1 = EasyPayGenerator.generate(customerId1);
    console.log(`Customer ID: ${customerId1}`);
    console.log(`Generated EasyPay Number: ${easyPayNumber1}`);
    console.log(`Formatted: ${EasyPayGenerator.formatForDisplay(easyPayNumber1)}`);
    console.log(`Valid: ${EasyPayGenerator.validate(easyPayNumber1)}\n`);

    // Test 2: Validation with specification examples
    console.log('=== Test 2: Specification Examples ===');

    // Example 1 from spec: Receiver ID = 6789, Account = 25433678212333
    // Expected: 96789254336782123338
    const specExample1 = '96789254336782123338';
    console.log(`Spec Example 1: ${specExample1}`);
    console.log(`Valid: ${EasyPayGenerator.validate(specExample1)}`);

    // Example 2 from spec: Receiver ID = 1500, Account = 123456789
    // Expected: 915001234567890
    const specExample2 = '915001234567890';
    console.log(`Spec Example 2: ${specExample2}`);
    console.log(`Valid: ${EasyPayGenerator.validate(specExample2)}\n`);

    // Test 3: Parse EasyPay number
    console.log('=== Test 3: Parse EasyPay Number ===');
    const parsed = EasyPayGenerator.parseEasyPayNumber(easyPayNumber1);
    if (parsed) {
        console.log(`Parsed components:`, parsed);
    } else {
        console.log('Failed to parse EasyPay number');
    }
    console.log();

    // Test 4: Test with different customer IDs
    console.log('=== Test 4: Different Customer IDs ===');
    const testCustomerIds = ['1', '123', '123456789', '987654321'];

    testCustomerIds.forEach(customerId => {
        try {
            const easyPayNumber = EasyPayGenerator.generate(customerId);
            console.log(`Customer ID: ${customerId.padStart(10, ' ')} -> EasyPay: ${easyPayNumber} (Length: ${easyPayNumber.length})`);
        } catch (error) {
            console.log(`Customer ID: ${customerId.padStart(10, ' ')} -> Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    console.log();

    // Test 5: Error handling
    console.log('=== Test 5: Error Handling ===');
    try {
        // This should fail because customer ID is too long
        const longCustomerId = '123456789012345678901234567890';
        EasyPayGenerator.generate(longCustomerId);
    } catch (error) {
        console.log(`Long customer ID error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    console.log();

    // Test 6: Manual Luhn calculation verification
    console.log('=== Test 6: Manual Luhn Verification ===');

    // Test with our receiver ID and a simple customer ID
    const testCustomerId = '1234567890';
    const receiverId = EasyPayGenerator.getReceiverId();
    const totalLength = EasyPayGenerator.getTotalLength();

    console.log(`Receiver ID: ${receiverId}`);
    console.log(`Total Length: ${totalLength}`);
    console.log(`Test Customer ID: ${testCustomerId}`);

    const generatedNumber = EasyPayGenerator.generate(testCustomerId);
    console.log(`Generated: ${generatedNumber}`);
    console.log(`Length: ${generatedNumber.length}`);
    console.log(`Valid: ${EasyPayGenerator.validate(generatedNumber)}`);

    console.log('\n=== All tests completed ===');
}

// Run the tests
testEasyPayGenerator();
