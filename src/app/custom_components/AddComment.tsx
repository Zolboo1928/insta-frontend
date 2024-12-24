import { jwtDecode } from "jwt-decode";
import { useState } from "react";

type decodedType = {
    _id: string;
    iat: number;
    exp: number;
}

export const AddComment = ()=>{
    const [inputValue, setinputValue] = useState("")
    const token = window.localStorage.getItem("authorization");
    const decoded:decodedType = jwtDecode(token)
    return (
      <>
        <div className="fixed bottom-0 left-0 flex gap-3 border-t-2 w-full p-4 bg-white">
          <input
            type="text"
            className=" focus:outline-none w-full"
            placeholder="Add a comment..."
            value={inputValue} onChange={(e)=> setinputValue(e.target.value)}
          />
          <button className=" text-blue-500 "  onClick={handleComment} >Post</button>
        </div>
      </>
    );
}