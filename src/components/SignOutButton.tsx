"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const [submitting, setSubmitting] = useState(false);
  const router=useRouter()
  return (
    <Button
      className="cursor-pointer"
      variant={`destructive`}
      disabled={submitting}
      onClick={async () => {
        setSubmitting(true);
        await authClient.signOut();
        setSubmitting(false);
        router.push("/")
      }}
    >
      {submitting ? <LoaderCircleIcon className="animate-spin size-4" /> : null}
      {submitting ? "Signing Out..." : "SignOut"}
    </Button>
  );
};

export default SignOutButton;
