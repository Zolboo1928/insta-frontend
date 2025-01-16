"use client";

import { use, useEffect, useState } from "react";
import { postType } from "../../homePage/page";
import { PostHeader } from "@/app/custom_components/PostHeader";
import { PostContent } from "@/app/custom_components/PostContent";
import { PostActions } from "@/app/custom_components/PostActions";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const Page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const router = useRouter()
  const [post, setPost] = useState<postType|undefined>();
  const [isloading, setIsLoading] = useState(true);
  const token = localStorage.getItem("authorization");
  const { postId } = use(params);
  const getPostById = async () => {
    const response = await fetch(
      `https://instagram-service-xt7j.onrender.com/post//getPostById/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) setIsLoading(false);
    const parsed = await response.json();
    setPost(parsed);
  };
  useEffect(() => {
    getPostById();
  }, []);

  const redirectToComments = ()=>{
      router.push(`/comments/${postId}`);
  }
   const redirectToProfile = () => {
     router.push("/profile");
   };
  if (!token) {
    return <div>Login Or Sign up</div>;
  } else if (isloading) {
    return <div className="text-center mt-[100%] ">Loading...</div>;
  }
  return (
    <div className="border-0 mb-[22px] pt-[60px] pb-12">
      <div
        className="flex justify-center h-11 items-center font-bold border-b-2 fixed top-0 bg-white w-full"
        onClick={redirectToProfile}
      >
        <ChevronLeft className="left-4 absolute" />
        <p>Post</p>
      </div>
      <PostHeader user={post?.userId} />
      <PostContent Images={post?.postImages} />
      <PostActions
      prevPage={`/post/${postId}`}
        getData={getPostById}
        token={token || ""}
        post={post}
        redirectToComments={redirectToComments}
      />
    </div>
  );
};
export default Page;
