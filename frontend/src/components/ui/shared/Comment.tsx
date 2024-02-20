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

interface Props {
  ticketId: string;
  currentUserImg: string;
  currentUserId: string;
}

export const CommentValidation = z.object({
  comment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

function Comment({ ticketId, currentUserImg, currentUserId }: Props) {
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async () => {
    form.reset();
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
                  src="
       "
                  alt="Profile image"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
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
