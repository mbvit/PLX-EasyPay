import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <Card className="p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">EasyPay Generator</h1>
        <p className="text-gray-600 mb-6">
          Generate and test EasyPay numbers according to the official specification.
        </p>
        <Link href="/easypay-test">
          <Button className="w-full">
            Go to EasyPay Test Page
          </Button>
        </Link>
      </Card>
    </div>
  );
}
