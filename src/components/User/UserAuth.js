import React, {  useContext, useEffect, useState } from "react";
import axios from 'axios';

const UserAuthContext = React.createContext(null);

const UserAuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [userlist, setUserlist] = useState([]);
    const [access, setAccess] = useState('');
    const API = process.env.REACT_APP_API || 'https://octopus-app-2s9og.ondigitalocean.app';

    const userlogin = (
        username,
        useremail,
        userpassword,
        userphone,
        useraccess,
        useridproof,
        useraddress,
    ) => {
        setUser({
            username,
            useremail,
            userpassword,
            userphone,
            useraccess,
            useridproof,
            useraddress,
        });

        setAccess(useraccess);
    };

    const setUserAccess = (newAccess) => {
        setAccess(newAccess);
    };

    useEffect(() => {
        axios.get(`${API}user`)
            .then(res => {
                setUserlist(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [API]); 

    const userlogout = () => {
        setUser(null);
        setAccess('');
    };

    return (
        <UserAuthContext.Provider
            value={{ user, userlogin, userlist, userlogout, access, setUserAccess }}>
            {props.children}
        </UserAuthContext.Provider>
    );
};

const useUserAuth = () => {
    return useContext(UserAuthContext);
};

export { UserAuthProvider, useUserAuth };
