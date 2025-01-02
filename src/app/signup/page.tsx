"use client"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = ()=>{
  const router = useRouter()
    const [ProfilePicValue , setProfilePicValue] = useState<string>("")
    const [EmailValue , setEmailValue] = useState<string>("")
    const [PasswordValue , setPasswordValue] = useState<string>("")
    const [userNameValue, setuserNameValue] = useState<string>("");
    const handleSignUp = async()=>{
        const newUser = {
          userName:userNameValue,
          password: PasswordValue,
          email: EmailValue,
          profileImage:ProfilePicValue
        };
        const response = await fetch("https://instagram-service-xt7j.onrender.com/user/signup",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify(newUser)
        });
        const data = await response.json()
        const token = data.tokenSignUp;
        if(token){
          window.localStorage.setItem("authorization", token);
          router.push("/homePage")
        }
    }
    const redirectToLogin = ()=>{
      router.push("/login")
    }
    return (
      <Card className="m-[20px]  ">
        <CardHeader className="text-center font-bold">Instagram</CardHeader>
        <CardContent className="space-y-[10px]">
          <div>
            <Input
              placeholder="Username"
              value={userNameValue}
              onChange={(e) => setuserNameValue(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Email"
              value={EmailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              value={PasswordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Profile picture url"
              value={ProfilePicValue}
              onChange={(e) => setProfilePicValue(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col justify-center gap-[7px]">
          <Button className="w-full" onClick={handleSignUp}>
            Sign up
          </Button>
          <div className="text-sm flex gap-1 items-center">
            Have an account?
            <p onClick={redirectToLogin} className=" font-bold text-sm">Login</p>
          </div>
        </CardFooter>
      </Card>
    );
}
export default Page