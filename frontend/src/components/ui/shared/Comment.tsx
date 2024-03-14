import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../button";
import { Input } from "../input";
import { useMutation, useQueryClient } from "react-query";
import { addComment } from "@/features/ticket-api/ticket-api";
import { Textarea } from "../textarea";
import FileUploader from "./FileUploader";
import { useState } from "react";


interface Props {
  ticketId: string;
  currentUserImg: string;
  currentUserId: string;
  projectId:string;
}

export const CommentValidation = z.object({
  comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }  ).max(500,{message:"You have exceeded the character limit. Please shorten your comment"}),
 file: z.custom<File[]>(),
});

function Comment({ ticketId,projectId, currentUserImg, currentUserId }: Props) {
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
      file:[],

    },
  });

  const [file,setFile]=useState([]);

const fileRef = form.register("file");
  
const queryClient= useQueryClient()
const mutation = useMutation(addComment,{
    onSuccess:(data)=>{
      queryClient.invalidateQueries("ticketCommentList")
    },
    onError:(e)=>{
console.log(e)
    }
})





  const onSubmit = async (values) => {

    // form.reset();

const imageFiles = values.file;
const formData = new FormData();

formData.append("text",values.comment);
formData.append("project",projectId);
formData.append("project",projectId);
formData.append("task",ticketId);

 Array.from(imageFiles).forEach((imageFile) => {
      formData.append("attachments", imageFile);
    });

mutation.mutate(formData)


  };

  return (
    <Form {...form}>
      <form className=" comment-forms flex flex-col gap-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full items-center">
              <FormLabel>
     
              </FormLabel>
              <FormControl className="border-none bg-transparent custom-scrollbar">
                <Textarea
                  
                  {...field}
                  placeholder="Comment..."
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Files</FormLabel>
              <FormControl>
<Input className="border-2 border-dashed border-gray-500" type="file" {...fileRef}  onChange={(event) => {
    field.onChange(event.target?.files?.[0] ?? undefined);
  }}/>
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn mt-1">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
