import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { DatePicker } from "@/components/ui/shared/DatePicker";

const ProjectFormStepTwo = ({ form, formStep, users, visibilityOptions }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-9 w-full max-w-5xl min-h-[500px] max-h-[500px]  ",
        {
          hidden:
            formStep === 1 ||
            formStep === 3 ||
            formStep === 4 ||
            formStep === 5 ||
            formStep === 6,
        }
      )}
    >
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Project Title</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>

            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Project overview</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" {...field} />
            </FormControl>

            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />

      <div className=" flex gap-8 items-center ">
        <div className="flex-1   ">
          <FormField
            control={form.control}
            name="leader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Leader</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shad-input">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                  <SelectContent>
                    {users &&
                      users?.results.map((user) => {
                        return (
                          <SelectItem
                            className="cursor-pointer "
                            value={user.id}
                          >
                            {user.email}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
     
        <div className="flex-1 flex-center ">
          
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className=' flex flex-col'>
              <FormLabel>Project Deadline</FormLabel>

              <FormControl>
                <DatePicker
                  onChange={(newDate) => field.onChange(newDate)}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
           
            </FormItem>
          )}
        />
        </div>
      </div>
    </div>
  );
};

export default ProjectFormStepTwo;
