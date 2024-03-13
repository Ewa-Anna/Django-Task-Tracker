import {
  Form,
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { DatePicker } from "@/components/ui/shared/DatePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectStepTwoValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppState } from "@/contexts/formContext";
import FileUploader from "@/components/ui/shared/FileUploader";
import MultiSelect, { SelectOption } from "@/components/ui/shared/MultiSelect";

const ProjectFormStepTwo = ({ currentStep, users, setCurrentStep, tags }) => {
  const [state, setState] = useAppState();

  const form = useForm<z.infer<typeof ProjectStepTwoValidation>>({
    resolver: zodResolver(ProjectStepTwoValidation),
    defaultValues: {
      title: "",
      description: "",
      onwer: "",
      deadline: "",
    },
  });

  const [value, setValue] = useState<SelectOption[]>([]);

  const processForm = (data) => {
    setState({ ...state, ...data, tags:value});

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div
      className={cn("flex flex-col gap-9 w-full max-w-5xl mb-8   mt-8  ", {
        hidden:
          currentStep === 0 ||
          currentStep === 2 ||
          currentStep === 3 ||
          currentStep === 4 ||
          currentStep === 5,
      })}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="flex flex-col gap-9 w-full max-w-5xl  justify-evenly "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Title</FormLabel>
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
                <FormLabel className="shad-form_label">Overview</FormLabel>
                <FormControl>
                  <Textarea
                    className="shad-textarea custom-scrollbar"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className=" flex gap-8 items-center  ">
            <div className="flex-1   ">
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leader</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="shad-input">
                          <SelectValue placeholder={form.watch("owner")} />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="shad-form_message" />

                      <SelectContent>
                        <SelectGroup>
                          {users &&
                            users?.map((user) => {
                              return (
                                <SelectItem
                                  className="cursor-pointer "
                                  value={user.id.toString()}
                                >
                                  {user.email}
                                </SelectItem>
                              );
                            })}
                        </SelectGroup>
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
                  <FormItem className=" flex flex-col gap-2 flex-1">
                    <FormLabel>Deadline</FormLabel>

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
          <div className="flex-1 flex flex-col gap-2 ">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiSelect
                      multiple
                      options={tags}
                      value={value}
                      onChange={(o) => setValue(o)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-10 ">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add files</FormLabel>
                  <FormControl>
                    <FileUploader fieldChange={field.onChange} mediaUrl={project?.imageUrl}/>
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            {/* sad */}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
              className={cn(" whitespace-nowrap  hover:bg-slate-800   ", {
                hidden: currentStep === 0,
              })}
            >
              <ArrowLeft className="mr-1" />
               Back
            </Button>
            <Button className="hover:bg-violet-600" variant="ghost">
              Next
              <ArrowRight className="ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectFormStepTwo;
