import React,{useContext,useEffect,useState} from "react";
import axios from 'axios';
const AdminAuthContext = React.createContext(null);

const AdminAuthProvider = (props) => {
    const [admin, setAdmin] = useState(null);
    const [adminlist, setAdminlist] = useState([]);
    const API = process.env.REACT_APP_API || 'https://octopus-app-2s9og.ondigitalocean.app';
    const adminlogin = (
        adminname, adminemail, adminpassword) => 
        {
            setAdmin(adminname, adminemail, adminpassword);
        }
    useEffect(() => {
        axios.get(`${API}/admin`)
        .then(res=>{setAdminlist(res.data)
        })
        .catch(err=>{console.log(err)})
      }
    )
    const adminsignup = (
        adminname, adminemail, adminpassword) => 
        {
            axios.post(`${API}/admin`, {
                adminname: adminname,
                adminemail: adminemail,
                adminpassword: adminpassword
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    const adminlogout = () => {
        setAdmin(null);
    }
    return (
        <AdminAuthContext.Provider
            value={{ admin, adminsignup, adminlist, adminlogin, adminlogout }}>
            {props.children}
        </AdminAuthContext.Provider>
    );

};

const useAdminAuth = () => {
    return useContext(AdminAuthContext);
}

export { AdminAuthProvider, useAdminAuth };