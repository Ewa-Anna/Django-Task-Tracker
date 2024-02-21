import { formatTimestamp } from "@/lib/utils";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "../textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../button";
import { useMutation } from "react-query";
import { deleteComment, editComment } from "@/features/ticket-api/ticket-api";



export const CommentValidation = z.object({
  editComment: z.string().nonempty().min(3, { message: "Minimum 3 characters." }  ).max(500,{message:"You have exceeded the character limit. Please shorten your comment"}),
  commentId:z.number()

});
const PostBox = ({ ...props }) => {

const [isEditable,setEditable]=useState(false)


const mutation = useMutation(editComment,{
  onSuccess:(data)=>{
      console.log(data)
  },
  onError:(e)=>{
console.log(e)
  }
})

const deleteMutation = useMutation(deleteComment,{
  onSuccess:(data)=>console.log(data),
  onError:(e)=>console.log(e)
})


const form = useForm<z.infer<typeof CommentValidation>>({
  resolver: zodResolver(CommentValidation),
  defaultValues: {
    editComment:props?props.text:"",
    commentId:props?props.id:""

  },
});
const onSubmit = async (values) => {

const id = values.commentId
const content = values.editComment
const formData = new FormData()

const obj = {
  id,
  formData
}
formData.append(content,content )
mutation.mutate(obj)

     

  // form.reset();
};

const removeComment= (id)=>{


  deleteMutation.mutate(id)
}




  return (
    <div>
      <div className="  flex flex-col mt-5 gap-4   break-all px-3 pb-6 bg-dark-2 rounded-[4px]">
        <div className="flex items-center justify-between gap-5 my-5 mx-0 ">
          <div className="flex gap-2  ">
            <img
              className="h-[46px] w-[46px] rounded-[50%] object-cover"
              src={
                props?.created_by?.photo ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt=""
            />
            <div className="flex flex-col gap-1   items-start ">
              <div className="flex gap-1 text-slate-200 font-semibold">
                <span>{props?.created_by?.first_name}</span>
                <span>{props?.created_by?.first_name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 justify-center">
                <span className="text-sm">{props?.created_by?.email}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-200 text-sm">
              {formatTimestamp(props?.created, true)}
            </span>
          </div>
        </div>

     
       {!isEditable&&<p className=" px-2 text-slate-200 ">{props?.text}</p>}
       {isEditable&&
    <Form {...form}>
    <form className=" flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="editComment"
        render={({ field }) => (
          <FormItem className="flex w-full items-center gap-3">
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

      <Button type="submit" className="comment-form_btn">
        Submit
      </Button>
    </form>
  </Form>
       }
        <div className="flex items-center gap-5 px-3 mt-6 ">
          <span className="cursor-pointer">
            <AiFillLike size={19} />
          </span>
          <span className="cursor-pointer">
            <IoChatbubbleEllipsesSharp size={19} />
          </span>
          <span className="cursor-pointer" onClick={()=>setEditable(true)}>
            <MdEdit size={19} />
          </span>
          <span className="cursor-pointer" onClick={()=>removeComment(props.id)}>
            <MdDelete size={19} />
          </span>
        </div>
      </div>

      <hr className="mb-5 mt-5 h-0 border-2 border-dark-3" />
    </div>
  );
};

export default PostBox;
