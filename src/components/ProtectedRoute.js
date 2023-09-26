//     Developed by Harsh Khatri

import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
export default function ProtectedRoute({children}){
    const {user } = useUserAuth() ; 
    console.log(user)
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children
}
