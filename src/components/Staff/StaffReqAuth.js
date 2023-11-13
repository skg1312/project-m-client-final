import React from "react";
import { useStaffAuth } from "./StaffAuth";
import { Navigate } from "react-router-dom";

const ReqStaffAuth = (props) => {
    const auth = useStaffAuth();
    if (!auth.staff) {
        return <Navigate to="/staff" />;
    }    
    return props.children;
}

export default ReqStaffAuth;