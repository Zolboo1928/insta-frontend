import { Heart, MessageCircle } from "lucide-react";
import { postType } from "../homePage/page";
import { jwtDecode } from "jwt-decode";
import { decodedType } from "./AddComment";
import { LikedUsersDialog } from "./LikedUsersDialog";
import { useState } from "react";
import { userType } from "./PostHeader";

export const PostActions = ({
  prevPage,
  getData,
  post,
  redirectToComments,
  token,
}: {
  prevPage: string
  getData: () => void;
  token: string;
  post: postType | undefined;
  redirectToComments: (id: string) => void;
}) => {
  const [likedUsers, setlikedUsers] = useState<userType[]>([]);
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const decoded: decodedType = jwtDecode(token || "");
  const likeInfo = {
    likedUser: decoded._id,
    post: post?._id,
  };

  const dislikeInfo = {
    dislikerId: decoded._id,
    postId: post?._id,
  };

  const handleLike = async () => {
    const response = await fetch(
      "https://instagram-service-xt7j.onrender.com/post/like",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(likeInfo),
      }
    );
    console.log(response);
    getData();
  };

  const handleDislike = async () => {
    const response = await fetch(
      "https://instagram-service-xt7j.onrender.com/post/dislike",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dislikeInfo),
      }
    );
    console.log(response);

    getData();
  };

  const handleLikedUsersDialog = () => setOpen(!open);

  const getLikedUsersOfPost = async () => {
    const response = await fetch(
      "https://instagram-service-xt7j.onrender.com/post/getPostWithLikedUsers",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post?._id }),
      }
    );
    if (response) setIsLoading(false);
    const data = await response.json();
    setlikedUsers(data.likedUsers);
  };

  return (
    <>
      <LikedUsersDialog
        likedUsers={likedUsers}
        open={open}
        onOpenChange={handleLikedUsersDialog}
        isloading={isloading}
        token={token}
        decoded={decoded}
        getLikedUsersOfPost={getLikedUsersOfPost}
      />
      <div className="ml-[16px] ">
        <div className="flex gap-4 my-3">
          <Heart
            className="hover:cursor-pointer"
            fill={post?.likedUsers.includes(decoded._id) ? "red" : "white"}
            color={post?.likedUsers.includes(decoded._id) ? "red" : "black"}
            onClick={
              post?.likedUsers.includes(decoded._id)
                ? handleDislike
                : handleLike
            }
          />
          <MessageCircle
            onClick={() => {
              localStorage.setItem("prevPage",prevPage)
              redirectToComments(post?._id || "");
            }}
            className={`hover:cursor-pointer`}
          />
        </div>
        <p
          className=" font-semibold"
          onClick={() => {
            setOpen(true);
            getLikedUsersOfPost();
          }}
        >
          {" "}
          {post?.likedUsers.length} likes
        </p>
        <div className="space-x-2">
          <span className="font-semibold">{post?.userId.userName}</span>
          <span>{post?.title}</span>
        </div>
        {post?.comments.length != 0 && (
          <p
            className=" text-slate-500 hover:cursor-pointer"
            onClick={() => {
              localStorage.setItem("prevPage", prevPage);
              redirectToComments(post?._id || "");
            }}
          >
            View all {post?.comments.length} comments
          </p>
        )}
      </div>
    </>
  );
};
