"use client";
import { AddComment } from "@/app/custom_components/AddComment";
import { OneComment } from "@/app/custom_components/OneComment";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const token = window.localStorage.getItem("authorization");
  const { postId } = use(params);
  const [comments, setComments] = useState<commentsType[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const getCommentsByPostId = async () => {
    const response = await fetch(
      `https://instagram-service-xt7j.onrender.com/post/getCommentsOfPost/${postId}`,
      {
        method:"GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      setIsLoading(false);
    }
    const parsedPost = await response.json();
    const allcomments = parsedPost.comments;
    setComments(allcomments);
  };
  useEffect(() => {
    getCommentsByPostId();
  }, []);
  const redirectToPrevPage = () => {
   const prevPage =  localStorage.getItem("prevPage")
    router.push(prevPage||"");
  };
  console.log("comments", comments)
  return (
    <div className="p-5 pb-[120px] space-y-4 mt-6 ">
      <div
        className="flex justify-center  h-11 items-center font-bold top-0 fixed bg-white border-b-2 w-full left-0"
        onClick={redirectToPrevPage}
      >
        <ChevronLeft className="left-4 absolute" />
        <p>Comments</p>
      </div>
      {isloading ? (
        <div className="text-center  ">Loading...</div>
      ) : (
        comments.length === 0 && (
          <div className="flex-col text-center ">
            <p className="font-bold text-2xl">No comments yet</p>
            <p>Start the conversation</p>
          </div>
        )
      )}
      {comments.map((comment, index) => {
        return <OneComment comment={comment} key={index} />;
      })}
      <AddComment postId={postId} getCommentsByPostId={getCommentsByPostId} />
    </div>
  );
};

export default Page;
