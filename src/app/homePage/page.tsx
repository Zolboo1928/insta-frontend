import { useState } from "react"

const Page = ()=>{
    type commentsType = {
      _id: string;
      comment: string;
      userId: string;
      commentedPostId: string;
    };
    type likedUsersTypes = {
      userName: string;
      profileImage: string;
      _id: string
    };
    type postType = {
      _id: string;
      title: string;
      postedUserImage: string;
      userId: string;
      comments: commentsType;
      likedUsers: likedUsersTypes;
    };
    const [post,setPost] = useState<postType>([])
    const getData = async ()=>{
        const response = fetch("")
    }
    return(
        <div></div>
    )
}
export default Page