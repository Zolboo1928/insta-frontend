import { Heart, MessageCircle } from "lucide-react";
import { postType } from "../homePage/page";
import { jwtDecode } from "jwt-decode";
import { decodedType } from "./AddComment";
import { useState } from "react";

export const PostActions = ({
  getData,
  post,
  redirectToComments,
  token
}: {
  getData:()=>void;
  token:string;
  post: postType;
  redirectToComments: (id: string) => void;
}) => {

  const decoded: decodedType = jwtDecode(token || "");

  const likeInfo = {
    likedUser:decoded._id,
    post: post._id,
  };

  const dislikeInfo = {
    dislikerId:decoded._id,
    postId: post._id,
  };

  const handleLike = async ()=>{
     const response = await fetch("https://instagram-service-xt7j.onrender.com/post/like",{
       method:"POST",
       headers:{
         "Content-type":"application/json",
         authorization:`Bearer ${token}`
       },
       body: JSON.stringify(likeInfo)
     });
     console.log(response)
     getData()
  }

  const handleDislike = async()=>{
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
  }
  return (
    <>
      <div className="ml-[16px] ">
        <div className="flex gap-4 my-3">
          <Heart
            className="hover:cursor-pointer"
            fill={post.likedUsers.includes(decoded._id) ? "red" : "white"}
            color={post.likedUsers.includes(decoded._id) ? "red" : "black"}
            onClick={
              post.likedUsers.includes(decoded._id) ? handleDislike : handleLike
            }
          />
          <MessageCircle
            onClick={() => redirectToComments(post._id)}
            className={`hover:cursor-pointer`}
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