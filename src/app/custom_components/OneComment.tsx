import { commentsType } from "../comments/[postId]/page";

export const OneComment = ({ comment }: { comment: commentsType }) => {
  return (
    <>
      <div className="flex gap-x-4 items-center">
        <img
          src={comment.userId.profileImage}
          alt=""
          className="w-[32px] h-[32px] rounded-full"
        />
        <div className="space-x-1">
          <span className="font-bold">{comment.userId.userName}</span>
          <span>{comment.comment}</span>
        </div>
      </div>
    </>
  );
};