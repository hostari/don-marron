import { cn } from "@/lib/utils";
import React from "react";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn("h-1 bg-[#212427] w-full my-5", className)}></div>;
};
