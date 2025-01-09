const Page = ()=>{
    const token = localStorage.getItem("authorization")
     if (!token) {
       return <div>Login Or Sign up</div>;
     }
    return(
        <>
        <div>upload</div>
        </>
    )
}
export default Page