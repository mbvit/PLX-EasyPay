/**
 * EasyPayGenerator - Generates EasyPay numbers according to the EasyPay specification
 * 
 * Structure: 9{rrrr}{aa...a}{c}
 * - 9: EasyPay number prefix (constant)
 * - rrrr: 4-digit Receiver Identifier
 * - aa...a: Variable length (1-14 digits) account reference
 * - c: Modulus 10 Luhn Check Digit
 */
export class EasyPayGenerator {
    // Constants
    private static readonly EASYPAY_PREFIX = '9';
    private static readonly RECEIVER_ID = '2813';
    private static readonly TOTAL_LENGTH = 18;

    /**
     * Generate an EasyPay number for a given customer ID
     * @param customerId - The customer ID to generate an EasyPay number for
     * @returns The generated EasyPay number
     * @throws Error if the customer ID is too long for the specified total length
     */
    public static generate(customerId: string): string {
        // Calculate the account field length
        const accountLength = this.TOTAL_LENGTH - 1 - this.RECEIVER_ID.length - 1; // Total - prefix - receiver - check digit

        if (customerId.length > accountLength) {
            throw new Error("Total character length is too short to accommodate the Customer ID.");
        }

        // Apply left-padding with zeros to fill the account field
        const paddedCustomerId = customerId.padStart(accountLength, '0');

        // Generate base number for Luhn calculation (without leading '9')
        const baseNumber = this.RECEIVER_ID + paddedCustomerId;

        // Calculate the Luhn check digit
        const checkDigit = this.calculateLuhnCheckDigit(baseNumber);

        // Construct the final EasyPay Number
        return this.EASYPAY_PREFIX + baseNumber + checkDigit;
    }

    /**
     * Format an EasyPay number for display with chevrons and grouping
     * @param easyPayNumber - The EasyPay number to format
     * @returns The formatted EasyPay number with chevrons and spacing
     */
    public static formatForDisplay(easyPayNumber: string): string {
        // Add chevrons prefix
        // const chevrons = '>>>>>> ';

        // Group the number into chunks of 4 digits
        const groups = [];
        for (let i = 0; i < easyPayNumber.length; i += 4) {
            groups.push(easyPayNumber.substring(i, i + 4));
        }

        // return chevrons + groups.join(' ');
        return groups.join(' ');
    }

    /**
     * Validate an EasyPay number
     * @param easyPayNumber - The EasyPay number to validate
     * @returns True if the EasyPay number is valid, false otherwise
     */
    public static validate(easyPayNumber: string): boolean {
        // Check if it starts with '9'
        if (!easyPayNumber.startsWith(this.EASYPAY_PREFIX)) {
            return false;
        }

        // Check if it's numeric
        if (!/^\d+$/.test(easyPayNumber)) {
            return false;
        }

        // Check length (7-20 digits)
        if (easyPayNumber.length < 7 || easyPayNumber.length > 20) {
            return false;
        }

        // Extract the base number (without prefix '9' and check digit)
        const baseNumber = easyPayNumber.substring(1, easyPayNumber.length - 1);
        const providedCheckDigit = parseInt(easyPayNumber.substring(easyPayNumber.length - 1));

        // Calculate the expected check digit
        const expectedCheckDigit = this.calculateLuhnCheckDigit(baseNumber);

        return providedCheckDigit === expectedCheckDigit;
    }

    /**
     * Calculate the Luhn checksum digit
     * Implementation based on the EasyPay specification:
     * - Starting from the last digit to the first
     * - Double each digit in an odd numbered position
     * - Subtract 9 if the product is larger than 9
     * - Add up all the even-numbered digits and all the previous products
     * - The check digit will be the number needed to make the sum a multiple of 10
     * 
     * @param number - The number to calculate the check digit for
     * @returns The Luhn check digit
     */
    private static calculateLuhnCheckDigit(number: string): number {
        let sum = 0;
        const reversedDigits = number.split('').reverse();

        for (let i = 0; i < reversedDigits.length; i++) {
            let digit = parseInt(reversedDigits[i]);

            // Double every digit in odd position (1-based counting from right)
            // Position 1, 3, 5, etc. (which are i=0, 2, 4 in 0-based array)
            if (i % 2 === 0) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
        }

        // Return the number needed to make the sum a multiple of 10
        return (10 - (sum % 10)) % 10;
    }

    /**
     * Extract components from an EasyPay number
     * @param easyPayNumber - The EasyPay number to parse
     * @returns Object containing the parsed components
     */
    public static parseEasyPayNumber(easyPayNumber: string): {
        prefix: string;
        receiverId: string;
        accountNumber: string;
        checkDigit: string;
    } | null {
        if (!this.validate(easyPayNumber)) {
            return null;
        }

        return {
            prefix: easyPayNumber.substring(0, 1),
            receiverId: easyPayNumber.substring(1, 5),
            accountNumber: easyPayNumber.substring(5, easyPayNumber.length - 1),
            checkDigit: easyPayNumber.substring(easyPayNumber.length - 1)
        };
    }

    /**
     * Get the receiver ID used by this generator
     * @returns The receiver ID
     */
    public static getReceiverId(): string {
        return this.RECEIVER_ID;
    }

    /**
     * Get the total length used by this generator
     * @returns The total length
     */
    public static getTotalLength(): number {
        return this.TOTAL_LENGTH;
    }
}

// Export default for easier imports
export default EasyPayGenerator;
