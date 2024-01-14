import { Link } from "react-router-dom";

type PostCardProps = {};

const PostCard = ({ post }: { PostCardProps }) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator._id}`}>
            <img
              src={
                post?.creator.userAvatar.url ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w12 lg:h-12"
            />
          </Link>

<div className="flex flex-col ">
<p className="base-medium lg:body-bold text-light-1">
    {post.creator.name}
</p>
<div className="flex-center gap-2 text-light-3">
<p className="subtle-semibold lg:small-regular">
    {post.createdAt}
</p>
</div>
<div>

-
<p className="subtle-semibold lg:small-regular">
  {post.creator.role}  
</p>
</div>

</div>


        </div>
      </div>
    </div>
  );
};

export default PostCard;
