import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { likedUserType } from "../homePage/page";

export const LikedUsersDialog = ({
  likedUsers,
  open,
  onOpenChange,
  isloading
}: {
  likedUsers: likedUserType[];
  open:boolean;
  onOpenChange:()=>void;
  isloading: boolean;
}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} >
        <DialogContent className=" rounded">
          <DialogTitle></DialogTitle>
          {isloading ? (
            <p>Loading</p>
          ) : likedUsers.length === 0 ? (
            <p>No likes</p>
          ) : (
            likedUsers?.map((likedUser, index) => {
              return (
                <DialogTitle key={index} className="flex items-center gap-3">
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
                    <p className="font-thin text-[16px] text-gray-500">{likedUser.email}</p>
                  </div>
                </DialogTitle>
              );
            })
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};