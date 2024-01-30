import {
  Form,
  FormControl,
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

const ProjectFormStepThree = ({ currentStep, setCurrentStep }) => {



const [state,setState]=useAppState()

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
    
    setCurrentStep(prev=>prev+1)
  
  };









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
        <form onSubmit={form.handleSubmit(processForm)}
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

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">
                    Add Tags (separated y comma " , "
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JS, React, NextJS, Node"
                      type="text"
                      className="shad-input"
                      {...field}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const tagsArray = inputValue
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag !== ""); // Remove empty tags

                        field.onChange(tagsArray);
                      }}
                    />
                  </FormControl>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end ">
            <Button 
            className=" hover:bg-slate-800 " variant="ghost"
            type="button"
            onClick={()=>{
              setCurrentStep(prev=>prev-1)
            }}
            >
              <ArrowLeft className="mr-1" /> Go Back
            </Button>
            <Button
            className="hover:bg-violet-600" variant="ghost"
            >
              Next <ArrowRight className="ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectFormStepThree;
