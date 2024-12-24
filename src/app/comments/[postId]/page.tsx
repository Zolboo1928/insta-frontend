"use client";
import { AddComment } from "@/app/custom_components/AddComment";
import {  OneComment } from "@/app/custom_components/OneComment";
import { use, useEffect, useState } from "react";

export type commentsType = {
  _id: string;
  comment: string;
  userId: userIdType;
  commentedPostId: string;
};
type userIdType = {
  _id: string;
  userName: string;
  profileImage: string;
};
const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const token = window.localStorage.getItem("authorization")
  const { postId } = use(params);
  const [comments, setComments] = useState<commentsType[]>([])
  const getCommentsByPostId = async ()=>{
    const response = await fetch(
      `https://instagram-service-xt7j.onrender.com/post/getPostById/${postId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      }
    );
    const parsedPost = await response.json()
    const allcomments = parsedPost.comments;
      setComments(allcomments);
  }
  useEffect(()=>{
    getCommentsByPostId()
  },[])
  console.log("comments",comments)
  if(!comments){
    return <div>
      no comments
    </div>
  }
  return (
    <div className="p-5 pb-[150px] space-y-4">
      {comments.map((comment, index) => {
        return <OneComment comment={comment} key={index} />;
      })}
    <AddComment/>
    </div>
  );
};

export default Page;
