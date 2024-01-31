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
import { TicketValidationSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Value } from "@radix-ui/react-select";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createTicket } from "@/features/ticket-api/ticket-api";
import { useAuthContext } from "@/contexts/AuthContext";

type ProjectFormProps = {
  title: string;
  description: string;
  file: string[];
  tags: string[];
};

export type INewTicket = {
  title: string;
  description: string;
  type: string;
  priority: string;
  file: File[];
};

const TicketForm = ({ ticket, priorityOptions, projects }: ProjectFormProps) => {
  const navigate = useNavigate();
  const { showToast } = useAuthContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof TicketValidationSchema>>({
    resolver: zodResolver(TicketValidationSchema),
    defaultValues: {
      project:"",
      title: ticket ? ticket.title : "",
      description: ticket ? ticket.description : "",
      type: ticket ? ticket.type : "",
      priority: ticket ? ticket.priority : "",
    },
  });

  const mutation = useMutation(createTicket, {
    onSuccess: (data) => {
      showToast({
        message: "Project has been created",
        type: "SUCCESS",
      });
      navigate(-1);
    },
    onError:(data)=>{
      showToast({
        message: "Something went wrong, please try again later.",
        type: "ERROR",
      });
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof TicketValidationSchema>) {

    console.log(values);
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
               <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Project</FormLabel>
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
                      {projects&&projects?.map((project)=>{ 
                        return (
                          <SelectItem className="cursor-pointer" value={project?.id.toLocaleString()}>
                            {project?.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
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
                    <SelectItem className="cursor-pointer " value={"bug"}>
                        <span className="flex gap-2">
                    Bug
                        </span>
                      </SelectItem>
                      <SelectItem className="cursor-pointer " value={"feature"}>
                        <span className="flex gap-2">
                     Feature
                        </span>
                      </SelectItem>
                      <SelectItem className="cursor-pointer " value={"question"}>
                        <span className="flex gap-2">
                     Question
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage className="shad-form_message" />
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
                      {priorityOptions&&Object.entries(priorityOptions).map(([key, value]) => {
                        return (
                          <SelectItem className="cursor-pointer" value={key}>
                            {value}
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
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
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
