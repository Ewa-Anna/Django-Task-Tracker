import React, { useState } from "react";
import {cn} from "../../../lib/utils"
type SelectOption = {
  name: string;
  id: number;
  created:string;
  updated:string;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

const MultiSelect = ({ value, onChange, options }: SelectProps) => {
const [isOpen,setIsOpen]=useState(false)

const clearOptions=()=>{
    onChange(undefined)
}

  return (
    <div
    onClick={()=>setIsOpen((prev)=>!prev)}
    onBlur={()=>setIsOpen(false)}
      tabIndex={0}
      className="relative w-[20em] border-2 border-[#777] rounded-[0.25em] flex min-h-[1.5em] items-center gap-[0.5em] p-[0.5em] outline-none focus:border-[hsl(200,100%,50%)] "
    >
      <span className="grow">{value?.name}</span>
      <button 
      onClick={e=>{
        e.stopPropagation()
        clearOptions()
      }}
      className="bg-none text-[#777] border-none outline-none cursor-pointer p-0 text-[1.25em] focus:text-[#333] hover:text-[#333]">
        &times;
      </button>
      <div className="bg-[#777] w-[0.1em] self-stretch "></div>
      <div className=" border-transparent border-2  border-t-[#777] "></div>

      <ul className={cn("m-0 p-0 list-none border-2 rounded-[0.25em] border-[#777] max-h-[15em] overflow-auto w-full left-0 top-[calc(100%+0.25em)] absolute bg-dark-2 z-50 custom-scrollbar ",{
        hidden:isOpen===false
      })}>
        {options&&options.map((option) => {
          return (
            <li
              className="py-[0.25em] px-[0.5em] cursor-pointer"
              key={option.label}
            >
              {option.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
