import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimestamp = (timestamp:string) => {
  const date = new Date(timestamp);

  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${
    monthNamesShort[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
};



export function timeUntilDeadline(deadline:string):string {
  // Aktualna data
  const currentDate = new Date();
  const deadlineTimestamp = new Date(deadline);
  
  // Obliczenie różnicy w milisekundach
  const differenceInMilliseconds:number = deadlineTimestamp - currentDate;
 
  // Obliczenie liczby dni z różnicy w milisekundach
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  // Obliczenie reszty godzin, jeśli różnica wynosi mniej niż jeden dzień
  const remainingHours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Zwracanie odpowiedniej formy
  if (differenceInDays > 0) {
      return `${differenceInDays} days`;
  } else {
      return `${remainingHours} hours`;
  }
}

