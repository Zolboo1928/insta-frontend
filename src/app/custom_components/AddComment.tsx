import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export type decodedType = {
  _id: string;
  userName: string;
  profileImage: string
};

export const AddComment = ({ postId, getCommentsByPostId }:{postId:string,getCommentsByPostId: ()=> void}) => {
  const [inputValue, setinputValue] = useState("");
  const token = localStorage.getItem("authorization");
  const decoded: decodedType = jwtDecode(token || "");

  const addCommentInfo = {
    comment: inputValue,
    userId: decoded._id,
    commentedPostId: postId,
  };

  const handleComment = async() => {
    try {
      const response = await fetch("https://instagram-service-xt7j.onrender.com/post/comment", {
        method:"POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(addCommentInfo)
      });
      console.log(response)
      getCommentsByPostId()
      setinputValue("")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="fixed bottom-12 left-0 flex gap-3 border-t-2 w-full p-4 bg-white">
        <input
          type="text"
          className=" focus:outline-none w-full"
          placeholder="Add a comment..."
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
        <p className=" text-blue-500 hover:text-black" onClick={handleComment}>
          Post
        </p>
      </div>
    </>
  );
};