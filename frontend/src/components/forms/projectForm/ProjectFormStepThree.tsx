import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FileUploader from '@/components/ui/shared/FileUploader'


const ProjectFormStepThree = ({form,formStep,project}) => {
  return (
    <div
    className={cn("flex flex-col gap-9 w-full max-w-5xl  min-h-[500px] max-h-[500px]  ", {
      hidden:
        formStep === 1 ||
        formStep === 2 ||
        formStep === 4 ||
        formStep === 5 ||
        formStep === 6,
    })}
  >

<div className='flex flex-col gap-10'>
<FormField
      control={form.control}
      name="file"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">Add files</FormLabel>
          <FormControl>
            <FileUploader
              fieldChange={field.onChange}
              mediaUrl={project?.imageUrl}
            />
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
            />
          </FormControl>

          <FormMessage className="shad-form_message" />
        </FormItem>
      )}
    />
</div>
  </div>
  )
}

export default ProjectFormStepThree