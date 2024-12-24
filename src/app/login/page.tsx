"use client"
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = ()=>{
  const router = useRouter()
  const [emailValue, setEmailValue] = useState<string>("")
  const [passwordValue , setPasswordValue] = useState<string>("")
  const loginUser = {
    email:emailValue,
    password: passwordValue
  }
  const handleLogin = async()=>{
    const response = await fetch(
      "https://instagram-service-xt7j.onrender.com/user/login",
      {
        method:"POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify(loginUser),
      }
    );
    const data = await response.json()
    const token = data.loginToken
    if(token){
      window.localStorage.setItem("authorization",token);
      router.push("/homePage")
    } 
  }
   const redirectToSignUp = () => {
     router.push("/signup");
   };
return (
  <Card className="text-center m-[20px] ">
    <CardHeader className="font-bold">Instagram </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Input
          placeholder="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <Input
          placeholder="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>
    </CardContent>
    <Button onClick={handleLogin}>Log in</Button>
    <CardFooter className="flex justify-center">
      <div className="flex gap-1 text-sm mt-4">
        <p>Don`t have an account?</p>
        <p className="font-bold" onClick={redirectToSignUp}>
          Sign up
        </p>
      </div>
    </CardFooter>
  </Card>
);
}
export default Page