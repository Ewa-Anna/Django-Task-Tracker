import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@/components/ui/shared/DatePicker';
import FileUploader from '@/components/ui/shared/FileUploader';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';


const ProjectFormStepFive = ({form, formStep,project,users}) => {
  return (
    <div
    className={cn("flex flex-col gap-6", {
      hidden:
        formStep === 1 ||
        formStep === 2 ||
        formStep === 3 ||
        formStep === 4 ||
        formStep === 6,
    })}
  >
    <div className="flex gap-5 flex-wrap">
      <div className="flex-1">
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Visibility</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="shad-input">
                    <SelectValue placeholder="Select a project visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    className="cursor-pointer "
                    value={"public"}
                  >
                    Public
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer "
                    value={"private"}
                  >
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex-1">
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
                    <SelectValue placeholder="Select a project leader" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {users &&
                    users?.results.map((user) => {
                      return (
                        <SelectItem
                          className="cursor-pointer "
                          value={user.email}
                        >
                          {user.email}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
      </div>
      <div className="flex-1 flex-col">
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
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
  </div>
  )
}

export default ProjectFormStepFive