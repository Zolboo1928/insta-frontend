"use client"
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

const Page = ()=>{
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
    console.log(token)
  }
return (
  <Card className="text-center">
    <CardHeader>
      <CardTitle>Instagram</CardTitle>
    </CardHeader>
    <CardContent>
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
    </CardContent>
    <Button onClick={handleLogin}>Log in</Button>
    <CardFooter className="flex justify-center">
      <p>Sign up</p>
    </CardFooter>
  </Card>
);
}
export default Page