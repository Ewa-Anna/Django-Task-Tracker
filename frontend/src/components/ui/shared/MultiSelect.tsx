import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "../../../lib/utils";
export type SelectOption = {
  name: string;
  id: number;
  created: string;
  updated: string;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};
type MultipleSelectProps = {
  multiple: true;
  value?: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

const MultiSelect = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef= useRef<HTMLDivElement>(null)

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value?.includes(option) : option === value;
  };

  const checkHighlightedIndex = (index: number) => {
    return index === highlightedIndex;
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [isOpen]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options])


  return (
    <div
    ref={containerRef}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className="relative w-full bg-dark-4 cursor-pointer   rounded-[0.25em] flex min-h-[1.5em] items-center gap-[0.5em] p-[0.5em] outline-none focus:border-[hsl(200,100%,50%)]r "
    >
      <span className="grow  flex flex-wrap gap-0.5">
        {multiple
          ? value.map((v) => (
              <button
              key={v?.id}
              className="flex items-center border-2 border-[#777] py-[0.15em] px-[0.25em] gap-[0.25e] cursor-pointer bg-none outline-none hover:bg-violet-600  focus:bg-violet-600 remove-btn rounded-[0.25em]"
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
              
              > {v?.name}
               <span className="hover:bg-violet-600  focus:bg-violet-600 ">
&times;
               </span>
              </button>
            ))
          : value?.name}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className="bg-none text-[#777] border-none outline-none cursor-pointer p-0 text-[1.25em] focus:text-[#333] hover:text-[#333]"
      >
        &times;
      </button>
      <div className="bg-[#777] w-[0.1em] self-stretch "></div>
      <div ><IoMdArrowDropdown/></div>

      <ul
        className={cn(
          "m-0 p-0 list-none border-2 rounded-[0.25em] border-[#777] max-h-[15em] overflow-auto w-full left-0 top-[calc(100%+0.25em)] absolute bg-dark-2 z-50 custom-scrollbar ",
          {
            hidden: isOpen === false,
          }
        )}
      >
        {options &&
          options.map((option, index) => {
            return (
              <li
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                  setIsOpen(false);
                }}
                className={cn("py-[0.25em] px-[0.5em] cursor-pointer", {
                  "bg-violet-500": isOptionSelected(option),
                  "bg-violet-900": checkHighlightedIndex(index),
                })}
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
