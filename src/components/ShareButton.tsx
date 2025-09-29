"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";

const ShareButton = () => {
  const pathname = usePathname();
  const [copiedText, setCopiedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const copyTextToClipBoard = async () => {
    try {
      setCopiedText(window.location.origin + pathname);
      await window.navigator.clipboard.writeText(copiedText);
      setCopied(true);
      setTimeout(()=>{
        setCopied(false)
      },2000)
    } catch (error) {
      setCopied(false)
    }
  };
  return (
    <Button
      variant="secondary"
      size="sm"
      className={"bg-white/20 hover:bg-white/30 text-white border-white/30"+ copied ? "opacity-50":"opacity-0"}
      onClick={copyTextToClipBoard}
    >
      <Share2 className="w-4 h-4 mr-2" />
      {copied ? "Copied" :"Share"}
    </Button>
  );
};

export default ShareButton;
