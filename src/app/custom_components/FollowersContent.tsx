import { jwtDecode } from "jwt-decode";
import { decodedType } from "./AddComment";
import { useEffect, useState } from "react";
import { userType } from "./PostHeader";

const FollowersContent = () => {
  const token = localStorage.getItem("authorization");
  const decoded: decodedType = jwtDecode(token || "");
  const [followers, setFollowers] = useState<userType[]>([]);
  const [isloading,setIsLoading] = useState(true)
  const getFollowers = async () => {
    const res = await fetch(
      "https://instagram-service-xt7j.onrender.com/user/getFollowersOfUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: decoded._id }),
      }
    );
    if(res) setIsLoading(false)
    const parsing = await res.json();
    setFollowers(parsing);
  };
  useEffect(() => {
    getFollowers();
  }, []);
  const handlefollow = async (userId: string) => {
    const res = await fetch(
      "https://instagram-service-xt7j.onrender.com/user/follow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          followerId: decoded._id,
          followedUserId: userId,
        }),
      }
    );
    if (res) getFollowers();
  };
  const handleUnFollow = async (userId: string) => {
    const res = await fetch(
      "https://instagram-service-xt7j.onrender.com/user/unfollow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          unfollowerId: decoded._id,
          unfollowedUserId: userId,
        }),
      }
    );
    if (res) getFollowers();
  };
  if(isloading){
    return <div className="text-center mt-[85%] ">Loading...</div>;
  } else if(followers.length===0){
    return (
      <div className="flex-col text-center ">
        <p className="font-bold text-2xl mt-[80%]">Haven't been followed yet</p>
        <p>There is a chance go get followed if you follow first</p>
      </div>
    );
  }
  return (
    <>
      <div>
        {followers.map((user, index) => {
          return (
            <div key={index} className="flex justify-between py-2 px-4">
              <div
                className="flex gap-2 font-semibold items-center "
                key={index}
              >
                <img
                  src={user.profileImage}
                  alt=""
                  width={44}
                  height={44}
                  className=" rounded-[50%] object-cover aspect-square"
                />
                <p>{user.userName}</p>
              </div>
              <button
                className={` ${
                  user.followers.includes(decoded._id)
                    ? `bg-gray-300 text-black`
                    : `bg-blue-500 text-white`
                } px-4 h-8 text-sm  rounded-md font-bold`}
                onClick={() =>
                  user.followers.includes(decoded._id)
                    ? handleUnFollow(user._id)
                    : handlefollow(user._id)
                }
              >
                {user.followers.includes(decoded._id) ? (
                  <p >Following</p>
                ) : (
                  <p>Follow back</p>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default FollowersContent;
