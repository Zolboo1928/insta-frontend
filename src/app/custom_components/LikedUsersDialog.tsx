import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { decodedType } from "./AddComment";
import { userType } from "./PostHeader";

export const LikedUsersDialog = ({
  getLikedUsersOfPost,
  decoded,
  likedUsers,
  token,
  open,
  onOpenChange,
  isloading,
}: {
  getLikedUsersOfPost:()=>void
  decoded: decodedType;
  token: string;
  likedUsers: userType[];
  open: boolean;
  onOpenChange: () => void;
  isloading: boolean;
}) => {
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
    getLikedUsersOfPost()
  };
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
    getLikedUsersOfPost()
  };
  console.log(decoded);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className=" rounded">
          <DialogTitle className="text-center border-b-2 pb-4">
            Likes
          </DialogTitle>
          {isloading ? (
            <div className="text-center  ">Loading...</div>
          ) : likedUsers.length === 0 ? (
            <div className="flex-col text-center ">
              <p className="font-bold text-2xl ">No likes yet</p>
              <p>Chance to like the post first</p>
            </div>
          ) : (
            likedUsers?.map((likedUser, index) => {
              return (
                <DialogTitle key={index} className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={likedUser.profileImage}
                      alt=""
                      width={44}
                      height={44}
                      className=" rounded-[50%] object-cover aspect-square"
                    />
                    <div>
                      <p className="font-semibold text-[16px]">
                        {likedUser.userName}
                      </p>
                      <p className="font-thin text-[16px] text-gray-500">
                        {likedUser.email}
                      </p>
                    </div>
                  </div>
                  {likedUser._id === decoded._id ? null : (
                    <button
                      className={` ${
                        likedUser.followers.includes(decoded._id)
                          ? `bg-gray-300 text-black`
                          : `bg-blue-500 text-white`
                      } px-4 h-8 text-sm  rounded-md font-bold`}
                      onClick={() =>
                        likedUser.followers.includes(decoded._id)
                          ? handleUnFollow(likedUser._id)
                          : handlefollow(likedUser._id)
                      }
                    >
                      {likedUser.followers.includes(decoded._id) ? (
                        <p>Following</p>
                      ) : (
                        likedUser.following.includes(decoded._id) ? <p>Follow back</p> : <p>Follow</p>
                      )}
                    </button>
                  )}
                </DialogTitle>
              );
            })
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};