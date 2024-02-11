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


export function DatePicker({ onChange }: { onChange: (date: Date) => void }) {
    const [date, setDate] = React.useState<Date>()
   
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
          
            mode="single"
            selected={date}
            onSelect={(newDate: Date) => {
                setDate(newDate);
                onChange(newDate); // Dodaj tę linijkę
              }}
            initialFocus
            
          />
        </PopoverContent>
      </Popover>
    )
  }