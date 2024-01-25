import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@/components/ui/shared/DatePicker';
import FileUploader from '@/components/ui/shared/FileUploader';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';


const ProjectFormStepFive = ({form, formStep}) => {
  return (
    <div
    className={cn("", {
      hidden:
        formStep === 1 ||
        formStep === 2 ||
        formStep === 3 ||
        formStep === 4 ||
        formStep === 6,
    })}
  >
    
SUMMARY

  </div>
  )
}

export default ProjectFormStepFive