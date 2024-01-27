import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/shared/DatePicker";
import FileUploader from "@/components/ui/shared/FileUploader";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const ProjectFormStepFive = ({ form, currentStep }) => {


  const renderFormValue = (fieldName) => {
    const value = form.getValues(fieldName);
  
   return <div className="border-2 flex">
<span className="flex-1">
{fieldName}
</span>
<span className="flex-1">
{value}
</span>
   </div>
  }

  return (
    <div
      className={cn("w-full min-h-[500px] border-2 flex justify-between overflow-hidden flex-col lg:flex-row", {
        hidden:
          currentStep === 0 ||
          currentStep === 1 ||
          currentStep === 2 ||
          currentStep === 3
   
      })}
    >
      <div className=" flex flex-col w-full">

     { renderFormValue("title")}
     { renderFormValue("description")}
     { renderFormValue("visibility")}

</div>
</div>)
  
};


export default ProjectFormStepFive;
