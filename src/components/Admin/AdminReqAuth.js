import React from "react";
import { useAdminAuth } from "./AdminAuth";
import { Navigate } from "react-router-dom";

const ReqAdminAuth = (props) => {
    const auth = useAdminAuth();
    if (!auth.admin) {
        return <Navigate to="/" />;
    }    
    return props.children;
}

export default ReqAdminAuth;