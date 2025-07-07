'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { EasyPayGenerator } from '@/lib/easypay-generator';

interface TestResult {
  customerId: string;
  easyPayNumber?: string;
  error?: string;
  isValid?: boolean;
  details?: {
    prefix: string;
    receiverId: string;
    account: string;
    checkDigit: string;
  };
}

export default function EasyPayTestPage() {
  const [customerId, setCustomerId] = useState('12345');
  const [easyPayNumber, setEasyPayNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [parsedComponents, setParsedComponents] = useState<any>(null);
  const [results, setResults] = useState<TestResult[]>([]);

  const handleGenerate = () => {
    try {
      const generated = EasyPayGenerator.generate(customerId);
      setEasyPayNumber(generated);
      setIsValid(EasyPayGenerator.validate(generated));
      setParsedComponents(EasyPayGenerator.parseEasyPayNumber(generated));
    } catch (error) {
      console.error('Error generating EasyPay number:', error);
      setEasyPayNumber('');
      setIsValid(false);
      setParsedComponents(null);
    }
  };

  const runPredefinedTests = () => {
    const verifiedTestCases = [
      { customerId: "5072", expectedEasyPay: "928130000000050728", expectedCheckDigit: "8" },
      { customerId: "13", expectedEasyPay: "928130000000000137", expectedCheckDigit: "7" },
      { customerId: "4", expectedEasyPay: "928130000000000046", expectedCheckDigit: "6" },
      { customerId: "11180", expectedEasyPay: "928130000000111801", expectedCheckDigit: "1" },
      { customerId: "187", expectedEasyPay: "928130000000001879", expectedCheckDigit: "9" },
      { customerId: "10176", expectedEasyPay: "928130000000101760", expectedCheckDigit: "0" },
      { customerId: "68", expectedEasyPay: "928130000000000681", expectedCheckDigit: "1" },
      { customerId: "7", expectedEasyPay: "928130000000000079", expectedCheckDigit: "9" },
      { customerId: "5448", expectedEasyPay: "928130000000054480", expectedCheckDigit: "0" },
      { customerId: "307", expectedEasyPay: "928130000000003073", expectedCheckDigit: "3" },
      { customerId: "3", expectedEasyPay: "928130000000000038", expectedCheckDigit: "8" },
      { customerId: "529", expectedEasyPay: "928130000000005292", expectedCheckDigit: "2" },
      { customerId: "11650", expectedEasyPay: "928130000000116503", expectedCheckDigit: "3" },
      { customerId: "11", expectedEasyPay: "928130000000000111", expectedCheckDigit: "1" },
      { customerId: "5777", expectedEasyPay: "928130000000057772", expectedCheckDigit: "2" },
    ];

    const newResults: TestResult[] = [];

    verifiedTestCases.forEach(testCase => {
      try {
        const generatedEasyPay = EasyPayGenerator.generate(testCase.customerId);
        const isValid = EasyPayGenerator.validate(generatedEasyPay);
        const isCorrect = generatedEasyPay === testCase.expectedEasyPay;

        const details = {
          prefix: generatedEasyPay.substring(0, 1),
          receiverId: generatedEasyPay.substring(1, 5),
          account: generatedEasyPay.substring(5, generatedEasyPay.length - 1),
          checkDigit: generatedEasyPay.substring(generatedEasyPay.length - 1)
        };

        newResults.push({
          customerId: `${testCase.customerId} (Expected: ${testCase.expectedEasyPay})`,
          easyPayNumber: generatedEasyPay,
          isValid: isValid && isCorrect,
          details,
          error: !isCorrect ? `Expected: ${testCase.expectedEasyPay}, Got: ${generatedEasyPay}` : undefined
        });
      } catch (error) {
        newResults.push({
          customerId: `${testCase.customerId} (Expected: ${testCase.expectedEasyPay})`,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    });

    setResults(newResults);
  };

  const clearResults = () => {
    setResults([]);
  };

  // Test the specification examples
  const specExample1 = '96789254336782123338';
  const specExample2 = '915001234567890';

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">EasyPay Generator Test</h1>

      {/* Configuration Section */}
      <Card className="mb-8 p-6 bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Receiver ID:</strong> {EasyPayGenerator.getReceiverId()}
          </div>
          <div>
            <strong>Total Length:</strong> {EasyPayGenerator.getTotalLength()} characters
          </div>
          <div>
            <strong>Format:</strong> 9{EasyPayGenerator.getReceiverId()}[account][check]
          </div>
        </div>
      </Card>

      {/* Generator Section */}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Generate EasyPay Number</h2>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="customerId">Customer ID</Label>
            <input
              id="customerId"
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter Customer ID"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleGenerate();
                }
              }}
            />
          </div>
          <Button onClick={handleGenerate}>
            Generate
          </Button>
        </div>

        {easyPayNumber && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p><strong>Generated EasyPay Number:</strong> {easyPayNumber}</p>
            <p><strong>Formatted:</strong> {EasyPayGenerator.formatForDisplay(easyPayNumber)}</p>
            <p><strong>Valid:</strong> {isValid ? 'Yes' : 'No'}</p>
            <p><strong>Length:</strong> {easyPayNumber.length}</p>

            {parsedComponents && (
              <div className="mt-2">
                <p><strong>Parsed Components:</strong></p>
                <ul className="ml-4">
                  <li>Prefix: {parsedComponents.prefix}</li>
                  <li>Receiver ID: {parsedComponents.receiverId}</li>
                  <li>Account Number: {parsedComponents.accountNumber}</li>
                  <li>Check Digit: {parsedComponents.checkDigit}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button onClick={runPredefinedTests} variant="outline">
          Run Test Cases
        </Button>
        <Button onClick={clearResults} variant="outline">
          Clear Results
        </Button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results ({results.length})</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className={`p-4 rounded ${result.error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Customer ID:</div>
                    <div className="font-mono text-lg">{result.customerId}</div>
                  </div>

                  {result.error ? (
                    <div>
                      <div className="text-sm text-red-600">Error:</div>
                      <div className="text-red-700 font-medium">{result.error}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-600">EasyPay Number:</div>
                      <div className="font-mono text-lg font-bold text-green-700">
                        {result.easyPayNumber}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Validation: {result.isValid ? '✅ Valid' : '❌ Invalid'}
                      </div>
                    </div>
                  )}
                </div>

                {result.details && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Breakdown:</div>
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="text-gray-500">Prefix</div>
                        <div className="font-mono bg-blue-100 px-2 py-1 rounded">
                          {result.details.prefix}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Receiver ID</div>
                        <div className="font-mono bg-purple-100 px-2 py-1 rounded">
                          {result.details.receiverId}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Account ({result.details.account.length} digits)</div>
                        <div className="font-mono bg-yellow-100 px-2 py-1 rounded">
                          {result.details.account}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Check Digit</div>
                        <div className="font-mono bg-green-100 px-2 py-1 rounded">
                          {result.details.checkDigit}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Specification Examples Section */}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Specification Examples</h2>

        <div className="mb-4">
          <h3 className="font-medium">Example 1: Receiver ID = 6789, Account = 25433678212333</h3>
          <p><strong>Expected:</strong> {specExample1}</p>
          <p><strong>Valid:</strong> {EasyPayGenerator.validate(specExample1) ? 'Yes' : 'No'}</p>
          <p><strong>Formatted:</strong> {EasyPayGenerator.formatForDisplay(specExample1)}</p>
        </div>

        <div>
          <h3 className="font-medium">Example 2: Receiver ID = 1500, Account = 123456789</h3>
          <p><strong>Expected:</strong> {specExample2}</p>
          <p><strong>Valid:</strong> {EasyPayGenerator.validate(specExample2) ? 'Yes' : 'No'}</p>
          <p><strong>Formatted:</strong> {EasyPayGenerator.formatForDisplay(specExample2)}</p>
        </div>
      </Card>

      {/* Test Different Customer IDs */}
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Test Different Customer IDs</h2>
        {['1', '123', '123456789', '987654321'].map((testId) => {
          try {
            const generated = EasyPayGenerator.generate(testId);
            return (
              <div key={testId} className="mb-2 p-2 bg-gray-50 rounded">
                <p><strong>Customer ID:</strong> {testId}</p>
                <p><strong>EasyPay Number:</strong> {generated}</p>
                <p><strong>Length:</strong> {generated.length}</p>
              </div>
            );
          } catch (error) {
            return (
              <div key={testId} className="mb-2 p-2 bg-red-50 rounded">
                <p><strong>Customer ID:</strong> {testId}</p>
                <p><strong>Error:</strong> {error instanceof Error ? error.message : 'Unknown error'}</p>
              </div>
            );
          }
        })}
      </Card>

      {/* Specification Reference */}
      <Card className="p-4 mt-8 bg-gray-50">
        <h3 className="font-semibold mb-2">EasyPay Number Specification Reference</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <div><strong>Structure:</strong> 9{"{rrrr}"}{"{aa...a}"}{"{c}"}</div>
          <div><strong>9:</strong> EasyPay prefix (always 9)</div>
          <div><strong>{"{rrrr}"}:</strong> 4-digit Receiver Identifier (2813)</div>
          <div><strong>{"{aa...a}"}:</strong> Variable length account reference (1-14 digits, padded with 0s)</div>
          <div><strong>{"{c}"}:</strong> Luhn Modulus 10 check digit</div>
          <div><strong>Total Length:</strong> 7-20 characters (our config: {EasyPayGenerator.getTotalLength()} max)</div>
        </div>
      </Card>
    </div>
  );
}
