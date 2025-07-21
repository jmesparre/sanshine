"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signInWithGoogle } = useAuth();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </div>
  );
}
