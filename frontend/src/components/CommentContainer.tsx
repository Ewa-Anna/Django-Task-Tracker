import React, { useState } from "react";
import Comment from "../components/Comment";
import { useAccountStore } from "../store";

const CommentContainer = ({
  comments,
  className,
  handleUpdateComment,
  affectedComment,
  setAffectedComment,
  handleDeleteComment,
}) => {
  const userAccount = useAccountStore((state) => state.account);
  console.log(userAccount);
  return (
    <div className={className}>
      <div className="space-y-4 mt-8">
        {comments?.results?.map((comment) => {
          return (
            <Comment
              projectId={comment?.project}
              ticketId={comment?.task}
              commentBelongsToUser={
                comment?.created_by?.id === userAccount.user_id
              }
              key={comment.id}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              comment={comment}
              handleUpdateComment={handleUpdateComment}
              handleDeleteComment={handleDeleteComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentContainer;
