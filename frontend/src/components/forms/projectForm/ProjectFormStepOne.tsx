import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

const ProjectFormStepOne = ({ form, formStep, visibilityOptions }) => {
  function renderIcon(visibilityType, size, color) {
    if (visibilityType === "public")
      return <MdPublic size={size} color={color} />;
    else {
      return <RiGitRepositoryPrivateLine size={size} color={color} />;
    }
  }

  return (
    <div
      className={cn(
        "flex justify-around  gap-9 w-full min-h-[510px] max-h-[900px]   max-w-5xl flex-wrap h-full ",
        {
          hidden:
            formStep === 2 ||
            formStep === 3 ||
            formStep === 4 ||
            formStep === 5 ||
            formStep === 6,
        }
      )}
    >
      <FormField
        control={form.control}
        name="visibility"
        render={({ field }) => (
          <div className="flex flex-col ">
            <div className=" flex flex-1 h-full  ">
              <FormItem className="space-y-3  flex flex-col flex-1 h-full ">
                <FormLabel className="text-xl  mb-8">
                  Select Project Type
                </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col-reverse gap-5  h-full lg:flex-row-reverse lg:gap-0"
                  >
                    {visibilityOptions &&
                      Object.entries(visibilityOptions.content).map(
                        ([key, value]) => (
                          <FormItem className="flex  justify-center items-center space-x-3 space-y-0 flex-1  ">
                            <FormLabel
                              className={`font-normal h-full w-12/12 transition-colors duration-200   cursor-pointer  rounded-[8px] relative border-2 border-slate-600 lg:w-10/12 hover:text-purple-900 ${
                                form.watch("visibility") === key
                                  ? "border-2 border-purple-900  "
                                  : ""
                              }`}
                            >
                              <div className=" flex flex-col  h-full py-4 ">
                                <div className="flex flex-col h-1/4 items-center justify-center   ">
                                  {renderIcon(key, 36, "rgb(143, 163, 184)")}

                                  <span className="text-lg mt-1 text-slate-400 uppercase tracking-wide font-semibold">
                                    {value}
                                  </span>
                                </div>
                                <div className="flex-1 px-9 text-sm flex mt-10 py-5 tracking-wide text-slate-400">
                                  {key === "public"
                                    ? "By choosing this option, your project will be accessible to all users. Everyone will be able to see the details of your project"
                                    : " Private project will only be visible to individuals who are assigned to the project. This is a good choice if you want to restrict access to a select group of people or maintain privacy during the development process."}
                                </div>
                              </div>
                              <FormControl>
                                <RadioGroupItem
                                  // className="hidden"
                                  value={key}
                                />
                              </FormControl>
                            </FormLabel>
                          </FormItem>
                        )
                      )}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            </div>
            <div className="flex justify-center mt-10 shad-form_message ">
              <FormMessage  />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ProjectFormStepOne;
