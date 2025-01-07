import { userType } from "./PostHeader"

export const UserSection = ({user}:{user:userType|null})=>{
    return (
      <>
        <div className="flex my-4">
          <img
            src={user?.profileImage}
            alt=""
            width={77}
            height={77}
            className=" rounded-[50%] object-cover aspect-square ml-4 mr-7"
          />
          <div>
            <p className="text-[20px] font-semibold">{user?.userName}</p>
            <button>Following</button>
          </div>
        </div>
      </>
    );
}