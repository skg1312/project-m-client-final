import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';

const StaffAuthContext = React.createContext(null);

const StaffAuthProvider = (props) => {
  const [staff, setStaff] = useState(null);
  const [stafflist, setStafflist] = useState([]);
  const API = process.env.REACT_APP_API || 'https://octopus-app-2s9og.ondigitalocean.app';
  const [access, setAccess] = useState('');

  const stafflogin = (
    staffname,
    staffemail,
    staffpassword,
    staffphone,
    staffaccess,
    staffidproof,
    staffofficebranch,
  ) => {
    setStaff({
      staffname,
      staffemail,
      staffpassword,
      staffphone,
      staffaccess,
      staffidproof,
      staffofficebranch,
    });

    setAccess(staffaccess);
  };

  const setStaffAccess = (newAccess) => {
    setAccess(newAccess);
  };

  useEffect(() => {
    axios.get(`${API}staff`)
      .then(res => {
        setStafflist(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [API]);

  const stafflogout = () => {
    setStaff(null);
    setAccess('');
  };

  return (
    <StaffAuthContext.Provider value={{ staff, stafflogin, stafflogout, stafflist, access, setStaffAccess }}>
      {props.children}
    </StaffAuthContext.Provider>
  );
};

const useStaffAuth = () => {
  return useContext(StaffAuthContext);
};

export { StaffAuthProvider, useStaffAuth };
