'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EasyPayGenerator } from "@/lib/easypay-generator";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  const [customerId, setCustomerId] = useState('');
  const [easyPayNumber, setEasyPayNumber] = useState('');
  const [formattedEasyPay, setFormattedEasyPay] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!customerId.trim()) {
      setError('Please enter your Customer ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const generated = EasyPayGenerator.generate(customerId.trim());
      const formatted = EasyPayGenerator.formatForDisplay(generated);
      setEasyPayNumber(generated);
      setFormattedEasyPay(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEasyPayNumber('');
      setFormattedEasyPay('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(easyPayNumber);
      // You could add a toast notification here
      console.log('EasyPay number copied to clipboard');
      toast.success("EasyPay number copied to clipboard")
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      toast.error("Failed to copy EasyPay number to clipboard");
    }
  };

  return (
    <div className="min-h-screen pluxnet-gradient">
      {/* Hero Section */}
      <div className=" text-white py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6 flex-col">
            {/* <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">P</span>
            </div> */}
            <div>
              <Link href="https://www.pluxnet.co.za" target="_blank" rel="noopener noreferrer">
                <img
                  src="/logo.png"
                  alt="PluxNet Logo"
                  className="w-32 h-32"
                />
              </Link>
            </div>
            {/* <div> */}
            {/* <h1 className="text-4xl font-bold">PluxNet Fibre</h1> */}
            {/* <p className="text-white/80">Fast. Reliable. Connected.</p> */}
            {/* </div> */}
          </div>
          <h2 className="text-3xl font-bold mb-2">EasyPay Reference Generator</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Generate your unique EasyPay reference number for PluxNet Fibre payments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Input Section */}
        <Card className="p-8  shadow-xl border-2 border-pluxnet-primary/20 bg-white">
          <div className="space-y-6">
            <div>
              <Label htmlFor="customerId" className="text-lg font-semibold text-pluxnet-primary">
                Customer ID
              </Label>
              <Input
                id="customerId"
                type="number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter your Customer ID"
                className="w-full mt-2 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-pluxnet-primary focus:outline-none focus:ring-2 focus:ring-pluxnet-primary/20 transition-all duration-200"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <p className="text-sm text-gray-500 mt-2">
                Find your Customer ID on your PluxNet Fibre invoice or account statement.
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-pluxnet-primary hover:bg-pluxnet-primary/90 text-white font-semibold py-4 px-6 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? 'Generating...' : 'Generate EasyPay Reference'}
            </Button>

            {/* Result Section */}
            {easyPayNumber && (
              <div className="bg-pluxnet-secondary/10 border-2 border-pluxnet-secondary/20 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">Your EasyPay Reference</h3>
                <div className="text-center">
                  <p className="text-3xl font-mono font-bold mb-2 break-all text-pluxnet-secondary ">
                    {formattedEasyPay}
                  </p>
                  <p className="text-white/80 text-sm mb-4">Raw Number</p>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleCopyToClipboard}
                    variant="outline"
                    className="px-8 py-3 border-2 border-pluxnet-secondary text-pluxnet-secondary hover:bg-pluxnet-secondary hover:text-white transition-all duration-200 font-semibold"
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
        </Card>

        {/* {easyPayNumber && (
          <div className="mt-8 space-y-6">
            <div className="bg-gradient-to-r from-pluxnet-astronaut to-pluxnet-mulberry p-8 rounded-xl text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-center">Your EasyPay Reference</h3>
              <div className="text-center">
                <p className="text-3xl font-mono font-bold mb-2 break-all">
                  {formattedEasyPay}
                </p>
                <p className="text-white/80 text-sm mb-4">Raw Number</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleCopyToClipboard}
                variant="outline"
                className="px-8 py-3 border-2 border-pluxnet-secondary text-pluxnet-secondary hover:bg-pluxnet-secondary hover:text-white transition-all duration-200 font-semibold"
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        )} */}

        {/* How to Use Section */}
        <Card className="mt-8 p-4 bg-white border-2 border-pluxnet-vivid-violet/20 shadow-lg">
          <h1 className="text-2xl font-bold text-pluxnet-primary mb-8 text-center">
            How to Use Your EasyPay Reference
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pluxnet-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl text-white">1</span>
              </div>
              <h4 className="font-semibold text-pluxnet-primary mb-3 text-lg">Generate</h4>
              <p className="text-gray-600">
                Enter your Customer ID and click generate to create your unique EasyPay reference
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pluxnet-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl text-white">2</span>
              </div>
              <h4 className="font-semibold text-pluxnet-primary mb-3 text-lg">Copy</h4>
              <p className="text-gray-600">
                Copy your EasyPay reference number to use for online or mobile banking payments
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-pluxnet-secondary flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl text-white">3</span>
              </div>
              <h4 className="font-semibold text-pluxnet-primary mb-3 text-lg">Pay</h4>
              <p className="text-gray-600">
                Use the reference when making your PluxNet Fibre payment through your bank
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-pluxnet-primary text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">PluxNet Fibre</p>
            <p className="text-white/80">
              Connecting South Africa with high-speed fiber internet
            </p>
            <p className="text-white/60 mt-4">
              Visit us at{' '}
              <a
                href="https://www.pluxnet.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pluxnet-apricot hover:underline"
              >
                www.pluxnet.co.za
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
