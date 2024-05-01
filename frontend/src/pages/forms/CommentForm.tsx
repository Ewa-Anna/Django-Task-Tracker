import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccountStore } from "../../store";

const CommentForm = ({
  comment,
  ticketId,
  projectId,
  handleSave,
  btnLabel,
  handleUpdateComment,
  formCancelHandler = null,

  loading = false,
}) => {
  console.log(ticketId);
  const csrfToken = useAccountStore((state) => state.csrfToken);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: comment ? comment?.text : "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { text } = data;
    const formData = new FormData();

    formData.append("text", text);
    formData.append("task", ticketId);
    formData.append("project", projectId);

    if (comment) {
      handleUpdateComment({ csrfToken, commentId: comment?.id, formData });
      reset();
      return;
    }

    handleSave({ csrfToken, formData });
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="5"
          placeholder="Add your comment here..."
          //   onChange={(e) => setValue(e.target.value)}
          {...register("text")}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-400
         text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
