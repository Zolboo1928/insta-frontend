type userType = {
    profileImage: string;
    userName: string;
}
export const PostHeader = ({user}: {user: userType})=>{
    return (
      <>
        <div className="flex gap-2 font-semibold items-center ml-[16px]">
          <img
            src={user.profileImage}
            alt=""
            width={32}
            height={32}
            className=" rounded-[50%] object-cover aspect-square"
          />
          <p>{user.userName}</p>
        </div>
      </>
    );
}