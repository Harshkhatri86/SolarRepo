//     Developed by Harsh Khatri

import React from "react";
import { useUserAuth } from "../Context/UserAuthContext";
import { Button } from "react-bootstrap";

export default function Home(){
    const {logout , user} = useUserAuth();
    const handleLogOut = async (e) =>{
       e.preventDefault(); 
       try{
         await logout() ; 
       }
       catch(err){
           console.log(err.message)
       }
    }
    // const {user } = useUserAuth() ; 
    return<>
    <h1>Home </h1>
    {user && user.email}
    <Button variant="primary" onClick={handleLogOut}>Logout</Button>
    </>
}