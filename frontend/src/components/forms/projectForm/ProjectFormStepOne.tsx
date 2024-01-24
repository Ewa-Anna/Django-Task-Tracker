import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import React from 'react'

const ProjectFormStepOne = ({form,formStep}) => {
  return (
    <div
    className={cn("flex flex-col gap-9 w-full max-w-5xl min-h-[500px] max-h-[500px]  ", {
      hidden:
        formStep === 2 ||
        formStep === 3 ||
        formStep === 4 ||
        formStep === 5 ||
        formStep === 6,
    })}
  >
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="shad-form_label">
            Project Title
          </FormLabel>
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
          <FormLabel className="shad-form_label">
            Project overview
          </FormLabel>
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
  )
}

export default ProjectFormStepOne