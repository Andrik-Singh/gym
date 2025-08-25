"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";

const SignOutButton = () => {
  const [submitting, setSubmitting] = useState(false);
  return (
    <Button
      className="cursor-pointer"
      variant={`destructive`}
      disabled={submitting}
      onClick={async () => {
        setSubmitting(true);
        await authClient.signOut();
        setSubmitting(false);
      }}
    >
      {submitting ? <LoaderCircleIcon className="animate-spin size-4" /> : null}
      {submitting ? "Signing Out..." : "SignOut"}
    </Button>
  );
};

export default SignOutButton;
