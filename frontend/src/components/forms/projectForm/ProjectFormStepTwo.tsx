import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import React from 'react'

const ProjectFormStepTwo = ({form,formStep}) => {
  return (
    <div
    className={cn(
      "flex justify-around  gap-9 w-full min-h-[500px] max-h-[500px]   max-w-5xl flex-wrap h-full ",
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
      name="stack"
      render={({ field }) => (
        <div className=" flex flex-1   h-full  ">
          <FormItem className="space-y-3  flex flex-col flex-1 h-full ">
            <FormLabel className="text-xl mb-10">
              Select Project Type
            </FormLabel>
        <div className=" flex justify-center shad-form_message">
        <FormMessage />
        </div>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex  justify-between    space-y-1  w-full "
              >
                <div className="flex flex-col flex-1 mt-5  h-[100%]  gap-20 md:flex-col md:mt-20 lg:flex-row lg:md:mt-28">
                  <div className={`flex flex-1 border-2 border-dark-4  rounded-[6px] ${form.watch("stack")==="frontend"?"border-2 border-indigo-800":''}`}>
                    <FormItem className="flex justify-center items-center space-x-3 space-y-0 flex-1 ">
                      <FormLabel className="font-normal  w-full h-full cursor-pointer  ">
                        <div className="flex flex-col items-center  h-full justify-center  ">
                          <span> Frontend</span>
                        </div>
                        <FormControl>
                          <RadioGroupItem
                            className="hidden"
                            value="frontend"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  </div>
                  <div className={`flex flex-1 border-2 border-dark-4  rounded-[6px] ${form.watch("stack")==="backend"?"border-2 border-indigo-800":''}`}>
                    <FormItem className="flex justify-center items-center space-x-3 space-y-0 flex-1">
                      <FormLabel className="font-normal w-full h-full cursor-pointer">
                        <div className="flex flex-col items-center h-full justify-center   ">
                          <span>Backend</span>
                        </div>
                        <FormControl>
                          <RadioGroupItem
                            className="hidden"
                            value="backend"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  </div>
                  <div className={`flex flex-1 border-2 border-dark-4  rounded-[6px] ${form.watch("stack")==="fullstack"?"border-2 border-indigo-800":''}`}>
                    <FormItem className="flex justify-center  items-center space-x-3 space-y-0 flex-1">
                      <FormLabel className="font-normal  w-full h-full cursor-pointer">
                        <div className="flex flex-col items-center h-full justify-center  ">
                          <span>Fullstack</span>
                        </div>
                        <FormControl>
                          <RadioGroupItem
                            className="hidden"
                            value="fullstack"
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
       
          </FormItem>
        </div>
      )}
    />
  </div>
  )
}

export default ProjectFormStepTwo