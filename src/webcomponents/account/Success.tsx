"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Optional: If you want to make it reusable with props

export const SuccessMessage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    // router.push(redirectPath);
    router.push("/");
    // or router.replace(redirectPath) if you don't want back button history
  };

  return (
    <div className="flex  items-center justify-center bg-background p-4">
      <Card className="w-full min-w-md border-none shadow-lg">
        <CardContent className="flex flex-col items-center justify-center space-y-6 pt-10 pb-8 text-center">
          {/* Title */}
          <h1 className="text-2xl font-bold tracking-tight">
            Congratulations!
          </h1>

          {/* Checkmark image */}
          <div className="relative h-24 w-24 rounded-full bg-primary/10 p-4">
            <Image
              src="/account/sticker.svg"
              alt="Success checkmark"
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          {/* Optional description */}

          {/* Home button */}
          <Button onClick={handleRedirect} className="w-full ">
            {"Go to home"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
