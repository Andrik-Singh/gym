import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function checkStringLength(str:string){
  if(str.length > 200){
    return str.slice(0,200) + "..." 
  }else{
    return str
  }
}