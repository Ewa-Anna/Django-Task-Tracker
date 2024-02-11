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
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUploader from "@/components/ui/shared/FileUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectStepThreeValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowRightLeft } from "lucide-react";
import { useAppState } from "@/contexts/formContext";
import { useQuery } from "react-query";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import MultiSelect, { SelectOption } from "@/components/ui/shared/MultiSelect";

const ProjectFormStepThree = ({ currentStep, setCurrentStep, tags }) => {
  const [state, setState] = useAppState();
  const [selectedTags, setSelectedTags] = useState([]);

  const form = useForm<z.infer<typeof ProjectStepThreeValidation>>({
    resolver: zodResolver(ProjectStepThreeValidation),
    defaultValues: {
      title: "",
      description: "",
      onwer: "",
      deadline: "",
    },
  });

  const processForm = (data) => {
    setState({ ...state, ...data });

    setCurrentStep((prev) => prev + 1);
  };

  const [value, setValue] = useState<SelectOption[]>([tags?.results[1]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(
    tags?.results[1]
  );
  return (
    <div
      className={cn(
        "flex flex-col gap-9 w-full max-w-5xl  min-h-[620px] max-h-[620px]  ",
        {
          hidden:
            currentStep === 0 ||
            currentStep === 1 ||
            currentStep === 3 ||
            currentStep === 4 ||
            currentStep === 5,
        }
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="flex flex-col justify-between  min-h-[620px] max-h-[620px]"
        >
          <div className="flex flex-col gap-10 ">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add files</FormLabel>
                  <FormControl>
                    <FileUploader fieldChange={field.onChange} mediaUrl="" />
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            {/* aas */}

            {/* <div className="flex-1   ">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="shad-input">
                          <SelectValue 
                   
                          placeholder={form.watch("owner")} />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="shad-form_message" />
                   
                      <SelectContent>
                      <SelectGroup>
                        {tags &&
                          tags?.results.map((tag) => {
                            return (
                              <SelectItem
                                className="cursor-pointer "
                                value={tag.id.toString()}

                                
                              >
                                {tag?.name}
                              </SelectItem>
                            );
                          })}
                                </SelectGroup>  
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div> */}

            <MultiSelect
              multiple
              options={tags?.results}
              value={value}
              onChange={(o) => setValue(o)}
            />
        
            {/* sad */}
          </div>
          <div className="flex justify-end ">
            <Button
              className=" hover:bg-slate-800 "
              variant="ghost"
              type="button"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              <ArrowLeft className="mr-1" /> Go Back
            </Button>
            <Button className="hover:bg-violet-600" variant="ghost">
              Next <ArrowRight className="ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectFormStepThree;
