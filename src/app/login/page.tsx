import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

const page = ()=>{
return (
  <Card className="text-center">
    <CardHeader>
      <CardTitle>Instagram</CardTitle>
    </CardHeader>
    <CardContent>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </CardContent>
    <Button>Log in</Button>
    <CardFooter className="flex justify-center">
      <a href="http://localhost:3000/signup" >Sign up</a>
    </CardFooter>
  </Card>
);
}
export default page