import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlinePublic } from "react-icons/md";
import { MdPrivateConnectivity } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../ui/shared/FileUploader";
import { ProjectValidationSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Value } from "@radix-ui/react-select";
import { useNavigate } from "react-router-dom";

type ProjectFormProps = {
  title: string;
  description: string;
  file: string[];
  tags: string[];
};

const TicketForm = ({ ticket }: ProjectFormProps) => {

  const navigate = useNavigate()
  // 1. Define your form.
  const form = useForm<z.infer<typeof ProjectValidationSchema>>({
    resolver: zodResolver(ProjectValidationSchema),
    defaultValues: {
      title: ticket ? ticket.title : "",
      description: ticket ? ticket.description : "",
      type:ticket?ticket.type:"",
      priority:ticket?ticket.priority:""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProjectValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Ticket Title</FormLabel>
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
                Ticket Description
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
    
        <div className="flex gap-5 ">
          <div className="flex-1">
          <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="shad-input">
                          <SelectValue placeholder="Select ticket type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      
                              <SelectItem className="cursor-pointer " value={"public"}><span className="flex gap-2"><MdOutlinePublic/>Public </span> </SelectItem>
                              <SelectItem className="cursor-pointer " value={"private"}><span className="flex gap-2"><MdPrivateConnectivity/>Private </span>  </SelectItem>
                      
                       
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <div className="flex-1 w-full">
          <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="shad-input">
                          <SelectValue placeholder="Select ticket priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      
                              <SelectItem className="cursor-pointer" value={"low"}>Low</SelectItem>
                              <SelectItem className="cursor-pointer" value={"medium"}>Medium</SelectItem>
                              <SelectItem className="cursor-pointer" value={"high"}>High</SelectItem>
                              <SelectItem className="cursor-pointer" value={"critical"}>Critical</SelectItem>
                      
                       
                      </SelectContent>
                    </Select>

                    <FormMessage />
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
                  mediaUrl={ticket?.imageUrl}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4" onClick={()=>navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TicketForm;
