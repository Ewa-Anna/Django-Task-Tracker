import React, { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import CommentForm from "../pages/forms/CommentForm";
import { images } from "../constants";
import { AiOutlineLike } from "react-icons/ai";
import { useAccountStore } from "../store";
const Comment = ({
  comment,
  projectId,
  ticketId,
  affectedComment,
  setAffectedComment,
  commentBelongsToUser,
  handleUpdateComment,
  handleDeleteComment,
}) => {
  const [isUserLoggined, setIsUserLoggedIn] = useState(true);
  const csrfToken = useAccountStore((state) => state.csrfToken);

  console.log(comment);

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment.id === comment.id;

  console.log(affectedComment);
  return (
    <div
      className={`${
        commentBelongsToUser ? "border " : ""
      } flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg border-2 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]`}
    >
      <img
        src={
          comment?.created_by?.photo
            ? comment?.created_by?.photo
            : images.ProfileImage
        }
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment?.created_by?.first_name}
        </h5>
        <span className="text-xs text-slate-500">
          {new Date(comment?.created).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light min-h-[100px] pt-5 pb-9 break-all ">
            {comment?.text}
          </p>
        )}
        {isEditing && (
          <CommentForm
            comment={comment}
            btnLabel="Update"
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            handleUpdateComment={handleUpdateComment}
            projectId={projectId}
            ticketId={ticketId}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <AiOutlineLike className="w-4 h-auto" />
              <span>Like</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", id: comment.id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  handleDeleteComment({ csrfToken, commentId: comment.id })
                }
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
