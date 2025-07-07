# EasyPayGenerator

A TypeScript implementation of the EasyPay number generator according to the EasyPay specification.

## Overview

The EasyPayGenerator class generates EasyPay numbers with the following structure:
`9{rrrr}{aa...a}{c}`

Where:
- `9` is the EasyPay number prefix (constant)
- `rrrr` is the 4-digit Receiver Identifier (2183)
- `aa...a` is a variable length (1-14 digits) account reference
- `c` is the Modulus 10 Luhn Check Digit

## Configuration

- **Receiver ID**: 2183
- **Total Length**: 19 digits
- **Account Length**: Variable (1-14 digits with padding)

## Features

- ✅ Generate EasyPay numbers from customer IDs
- ✅ Validate EasyPay numbers using Luhn algorithm
- ✅ Format EasyPay numbers for display with chevrons
- ✅ Parse EasyPay numbers into components
- ✅ Proper error handling for invalid inputs
- ✅ Full compliance with EasyPay specification

## Usage

### Basic Generation

```typescript
import { EasyPayGenerator } from '@/lib/easypay-generator';

// Generate an EasyPay number
const customerId = '12345';
const easyPayNumber = EasyPayGenerator.generate(customerId);
console.log(easyPayNumber); // e.g., "9218300000000012345X"
```

### Validation

```typescript
// Validate an EasyPay number
const isValid = EasyPayGenerator.validate(easyPayNumber);
console.log(isValid); // true or false
```

### Formatting for Display

```typescript
// Format for display with chevrons
const formatted = EasyPayGenerator.formatForDisplay(easyPayNumber);
console.log(formatted); // ">>>>>> 9218 3000 0000 0012 345X"
```

### Parse Components

```typescript
// Parse an EasyPay number into components
const parsed = EasyPayGenerator.parseEasyPayNumber(easyPayNumber);
if (parsed) {
  console.log(parsed.prefix);        // "9"
  console.log(parsed.receiverId);    // "2183"
  console.log(parsed.accountNumber); // "000000012345"
  console.log(parsed.checkDigit);    // "X"
}
```

### Configuration

```typescript
// Get current configuration
const receiverId = EasyPayGenerator.getReceiverId();   // "2183"
const totalLength = EasyPayGenerator.getTotalLength(); // 19
```

## API Reference

### Static Methods

#### `generate(customerId: string): string`
Generates an EasyPay number for the given customer ID.

**Parameters:**
- `customerId` - The customer ID to generate an EasyPay number for

**Returns:**
- The generated EasyPay number as a string

**Throws:**
- `Error` if the customer ID is too long for the specified total length

#### `validate(easyPayNumber: string): boolean`
Validates an EasyPay number using the Luhn algorithm.

**Parameters:**
- `easyPayNumber` - The EasyPay number to validate

**Returns:**
- `true` if valid, `false` otherwise

#### `formatForDisplay(easyPayNumber: string): string`
Formats an EasyPay number for display with chevrons and spacing.

**Parameters:**
- `easyPayNumber` - The EasyPay number to format

**Returns:**
- The formatted EasyPay number with chevrons and spacing

#### `parseEasyPayNumber(easyPayNumber: string): ParsedComponents | null`
Parses an EasyPay number into its components.

**Parameters:**
- `easyPayNumber` - The EasyPay number to parse

**Returns:**
- Object with `prefix`, `receiverId`, `accountNumber`, and `checkDigit` properties, or `null` if invalid

#### `getReceiverId(): string`
Returns the configured Receiver ID.

#### `getTotalLength(): number`
Returns the configured total length for EasyPay numbers.

## Specification Examples

The implementation correctly handles the specification examples:

### Example 1
- Receiver ID: 6789
- Account: 25433678212333
- Expected: 96789254336782123338
- ✅ Validates correctly

### Example 2
- Receiver ID: 1500
- Account: 123456789
- Expected: 915001234567890
- ✅ Validates correctly

## Error Handling

The generator will throw an error if:
- The customer ID is too long to fit within the total length constraint
- Invalid characters are provided

The validator will return `false` for:
- EasyPay numbers not starting with '9'
- Non-numeric characters
- Invalid length (not between 7-20 digits)
- Invalid Luhn check digit

## Testing

A test page is available at `/easypay-test` to verify the implementation with various scenarios.

## Implementation Details

- Uses the Luhn algorithm for check digit calculation
- Supports variable length account numbers with zero-padding
- Maintains fixed receiver ID and total length as specified
- Follows the exact specification for check digit positioning and calculation
