import { Heart, MessageCircle } from "lucide-react";
import { postType } from "../homePage/page";

export const PostActions = ({
  post,
  redirectToComments,
}: {
  post: postType;
  redirectToComments: (id: string) => void;
}) => {
  return (
    <>
      <div className="ml-[16px] ">
        <div className="flex gap-4 my-3">
          <Heart className="hover:cursor-pointer" />
          <MessageCircle
            onClick={() => redirectToComments(post._id)}
            className="hover:cursor-pointer"
          />
        </div>
        <p className=" font-semibold">{post.likedUsers.length} likes</p>
        <div className="space-x-2">
          <span className="font-semibold">{post.userId.userName}</span>
          <span>{post.title}</span>
        </div>
        {post.comments.length != 0 && (
          <p
            className=" text-slate-500 hover:cursor-pointer"
            onClick={() => redirectToComments(post._id)}
          >
            View all {post.comments.length} comments
          </p>
        )}
      </div>
    </>
  );
};