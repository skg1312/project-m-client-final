import React from "react";
import { useUserAuth } from "./UserAuth";
import { Navigate } from "react-router-dom";

const ReqUserAuth = (props) => {
    const auth = useUserAuth();
    if (!auth.user) {
        return <Navigate to="/user" />;
    }    
    return props.children;
}

export default ReqUserAuth;