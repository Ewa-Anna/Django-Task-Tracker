import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../button";
import { Input } from "../input";
import { useMutation, useQueryClient } from "react-query";
import { addComment } from "@/features/ticket-api/ticket-api";
import { Textarea } from "../textarea";


interface Props {
  ticketId: string;
  currentUserImg: string;
  currentUserId: string;
  projectId:string;
}

export const CommentValidation = z.object({
  comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }  ).max(500,{message:"You have exceeded the character limit. Please shorten your comment"}),

});

function Comment({ ticketId,projectId, currentUserImg, currentUserId }: Props) {
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",

    },
  });

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
    const obj = {
        text:values.comment,
        project:projectId,
        task:ticketId
    }
        mutation.mutate(obj)
    console.log(values)

  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
              <img
            src={currentUserImg || "/assets/icons/profile-placeholder.svg"}
            alt="Profile image"
            className="h-14 w-14 rounder-full"
          />
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

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
