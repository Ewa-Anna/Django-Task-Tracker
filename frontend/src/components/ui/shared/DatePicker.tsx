import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type DatePickerProps ={
  minAge?:string;
  maxAge?:string;
  onChange: (date: Date) => void ;
}

export function DatePicker({ onChange,minAge = '0', maxAge = '0' }:DatePickerProps) {
    const [date, setDate] = React.useState<Date>()
   
  const defaultDate = new Date();
  defaultDate.setFullYear(2000);

const now = new Date();
const maxDate = new Date();
const minDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - Number(minAge));
minDate.setFullYear(minDate.getFullYear() - Number(maxAge));

console.log(maxDate)

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            
            className={cn(
              "w-full justify-start text-left font-normal bg-dark-4 h-12",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"  />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-dark-4"  >
          <Calendar
          defaultDate={new Date(maxDate ||new Date())}
            mode="single"
            selected={date}
            onSelect={(newDate: Date) => {
                setDate(newDate);
                onChange(newDate);
              }}
          disabled={date => {
    if (minAge === '0' && maxAge === '0') {
                            return false; // Żadne daty nie są wyłączone
                        }

  return date > maxDate|| date < minDate;
}}
            initialFocus
            
          />
        </PopoverContent>
      </Popover>
    )
  }