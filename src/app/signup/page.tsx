"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Page = ()=>{
    const [FirstnameValue , setFirstnameValue] = useState<string>("")
    const [LastnameValue , setLastnameValue] = useState<string>("")
    const [UsernameValue , setUsernameValue] = useState<string>("")
    const [EmailValue , setEmailValue] = useState<string>("")
    const [PasswordValue , setPasswordValue] = useState<string>("")
    const [isFirstNameEmpty , setisFirstNameEmpty] = useState<boolean>(false)
    const [isLastnameEmpty , setisLastnameEmpty] = useState<boolean>(false)
    const [isUserNameEmpty , setisUserNameEmpty] = useState<boolean>(false)
    const [isEmailEmpty , setisEmailEmpty] = useState<boolean>(false)
    const [isPasswordEmpty , setisPasswordEmpty] = useState<boolean>(false)
    const checkEmptyFields = ()=>{
        if(!FirstnameValue) setisFirstNameEmpty(true)
            else setisFirstNameEmpty(false)
        if(!LastnameValue) setisLastnameEmpty(true)
          else setisLastnameEmpty(false)
        if(!UsernameValue) setisUserNameEmpty(true)
          else setisUserNameEmpty(false)
        if(!EmailValue) setisEmailEmpty(true)
          else setisEmailEmpty(false)
        if(!PasswordValue) setisPasswordEmpty(true)
          else setisPasswordEmpty(false)
    }

    const handleSignUp = ()=>{
        checkEmptyFields()
    }
    return (
      <Card className="m-[20px]  ">
        <CardHeader className="text-center">Instagram</CardHeader>
        <CardContent className="space-y-[10px]">
          <div>
            <Input
              placeholder="Firstname"
              value={FirstnameValue}
              onChange={(e) => setFirstnameValue(e.target.value)}
            />
            {isFirstNameEmpty && (
              <div className="text-red-500 text-xs ml-[5px] mt-[3px]">*Required</div>
            )}
          </div>
          <div>
            <Input
              placeholder="Lastname"
              value={LastnameValue}
              onChange={(e) => setLastnameValue(e.target.value)}
            />
            {isLastnameEmpty && (
              <div className="text-red-500 text-xs ml-[5px] mt-[3px]">*Required</div>
            )}
          </div>
          <div>
            <Input
              placeholder="Username"
              value={UsernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
            />
            {isUserNameEmpty && (
              <div className="text-red-500 text-xs ml-[5px] mt-[3px]">*Required</div>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              value={EmailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            {isEmailEmpty && (
              <div className="text-red-500 text-xs ml-[5px] mt-[3px]">*Required</div>
            )}
          </div>
          <div>
            <Input
              placeholder="Password"
              value={PasswordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            {isPasswordEmpty && (
              <div className="text-red-500 text-xs ml-[5px] mt-[3px]">*Required</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col justify-center gap-[7px]">
          <Button className="w-full" onClick={handleSignUp}>
            Sign up
          </Button>
          <div className="text-xs">
            Have an account?
            <a href="http://localhost:3000/login" className="underline">
              {" "}
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    );
}
export default Page