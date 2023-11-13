import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StaffAuthProvider } from '../Staff/StaffAuth';
import ReqStaffAuth from '../Staff/StaffReqAuth';
import StaffLogin from '../Staff/Stafflogin';
import StaffDashboardHO from '../Staff/StaffdashboardHO';
import StaffDashboardGeneral from '../Staff/StaffdashboardGeneral';
import StaffDashboard from '../Staff/Staffdashboard';

function Staff() {
  return (
    <div className="Staff">
      <StaffAuthProvider>
          <Routes>
            <Route path='/' element={<StaffLogin />} />
            <Route path='/staff' element={<ReqStaffAuth>
              <StaffDashboard />
            </ReqStaffAuth>} />
            <Route path='/staffHO' element={<ReqStaffAuth>
              <StaffDashboardHO />
            </ReqStaffAuth>} />
            <Route path='/staffGeneral' element={<ReqStaffAuth>
              <StaffDashboardGeneral />
            </ReqStaffAuth>} />
          </Routes>
      </StaffAuthProvider>
    </div>
  );
}

export default Staff;
