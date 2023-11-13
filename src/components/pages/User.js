import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserAuthProvider } from '../User/UserAuth';
import ReqUserAuth from '../User/UserReqAuth';
import UserLogin from '../User/Userlogin';
import UserDashboard from '../User/Userdashboard';
import UserDashboardHO from '../User/UserdashboardHO';
import UserDashboardGeneral from '../User/UserdashboardGeneral';

function User() {
  return (
    <div className="User">
      <UserAuthProvider>
          <Routes>
            <Route path='/' element={<UserLogin />} />
            <Route path='/superdash' element={<ReqUserAuth>
              <UserDashboard />
            </ReqUserAuth>} />
            <Route path='/hodash' element={<ReqUserAuth>
              <UserDashboardHO />
            </ReqUserAuth>} />
            <Route path='/gendash' element={<ReqUserAuth>
              <UserDashboardGeneral />
            </ReqUserAuth>} />
          </Routes>
      </UserAuthProvider>
    </div>
  );
}

export default User;
