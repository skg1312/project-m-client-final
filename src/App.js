import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './components/Admin/AdminAuth';
import ReqAdminAuth from './components/Admin/AdminReqAuth';
import AdminLogin from './components/Admin/Adminlogin';
import AdminDashboard from './components/Admin/Admindashboard';
import { StaffAuthProvider } from './components/Staff/StaffAuth';
import ReqStaffAuth from './components/Staff/StaffReqAuth';
import StaffLogin from './components/Staff/Stafflogin';
import StaffDashboardHO from './components/Staff/StaffdashboardHO';
import StaffDashboardGeneral from './components/Staff/StaffdashboardGeneral';
import StaffDashboard from './components/Staff/Staffdashboard';
import { UserAuthProvider } from './components/User/UserAuth';
import ReqUserAuth from './components/User/UserReqAuth';
import UserLogin from './components/User/Userlogin';
import UserDashboard from './components/User/Userdashboard';
import UserDashboardHO from './components/User/UserdashboardHO';
import UserDashboardGeneral from './components/User/UserdashboardGeneral';
import AdminBuyerManage from './components/Admin/AdminBuyerManage';
import AdminSellerManage from './components/Admin/AdminSellerManage';
import AdminCompanyManage from './components/Admin/AdminCompanyManage';
import AdminConsignmentManage from './components/Admin/AdminConsignmnetManage';
import AdminStaffManage from './components/Admin/AdminStaffManage';
import AdminUserManage from './components/Admin/AdminUserManage';
import StaffBuyerManage from './components/Staff/StaffBuyerManage';
import StaffSellerManage from './components/Staff/StaffSellerManage';
import StaffCompanyManage from './components/Staff/StaffCompanyManage';
import StaffConsignmentManage from './components/Staff/StaffConsignmentManage';
import StaffVechicleManage from './components/Staff/StaffVechicleManage';
import UserBuyerManage from './components/User/UserBuyerManage';
import UserSellerManage from './components/User/UserSellerManage';
import UserCompanyManage from './components/User/UserCompanyManage';
import UserConsignmentManage from './components/User/UserConsignmentManage';
import UserVechicleManage from './components/User/UserVechicleManage';
import AdminVechicleManage from './components/Admin/AdminVechicleManage';


function App() {
  return (
    <Router>
      <div>
        {/* Admin Routes */}
        <AdminAuthProvider>
          <Routes>
            <Route path='/' element={<AdminLogin />} />
            <Route path='/admindashboard' element={
              <ReqAdminAuth>
                <AdminDashboard />
              </ReqAdminAuth>
            } />
            <Route path='/adminbuyman' element={
              <ReqAdminAuth>
                <AdminBuyerManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminsellman' element={
              <ReqAdminAuth>
                <AdminSellerManage />
              </ReqAdminAuth>
            } />
            <Route path='/admincomman' element={
              <ReqAdminAuth>
                <AdminCompanyManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminconman' element={
              <ReqAdminAuth>
                <AdminConsignmentManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminstaffman' element={
              <ReqAdminAuth>
                <AdminStaffManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminuserman' element={
              <ReqAdminAuth>
                <AdminUserManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminvecman' element={
              <ReqAdminAuth>
                <AdminVechicleManage />
              </ReqAdminAuth>
            } />
          </Routes>
        </AdminAuthProvider>

        {/* Staff Routes */}
        <StaffAuthProvider>
          <Routes>
            <Route path='/staff' element={<StaffLogin />} />
            <Route path='/staffsuperdash' element={<ReqStaffAuth>
              <StaffDashboard />
            </ReqStaffAuth>} />
            <Route path='/staffhodash' element={<ReqStaffAuth>
              <StaffDashboardHO />
            </ReqStaffAuth>} />
            <Route path='/staffgendash' element={<ReqStaffAuth>
              <StaffDashboardGeneral />
            </ReqStaffAuth>} />
            <Route path='/staffbuyman' element={<ReqStaffAuth>
              <StaffBuyerManage />
            </ReqStaffAuth>} />
            <Route path='/staffsellman' element={<ReqStaffAuth>
              <StaffSellerManage />
            </ReqStaffAuth>} />
            <Route path='/staffcomman' element={<ReqStaffAuth>
              <StaffCompanyManage />
            </ReqStaffAuth>} />
            <Route path='/staffconman' element={<ReqStaffAuth>
              <StaffConsignmentManage />
            </ReqStaffAuth>} />
            <Route path='/staffvecman' element={<ReqStaffAuth>
              <StaffVechicleManage />
            </ReqStaffAuth>} />

          </Routes>
          

        </StaffAuthProvider>

        {/* User Routes */}
        <UserAuthProvider>
          <Routes>
            <Route path='/user' element={<UserLogin />} />
            <Route path='/usersuperdash' element={<ReqUserAuth>
              <UserDashboard />
            </ReqUserAuth>} />
            <Route path='/userhodash' element={<ReqUserAuth>
              <UserDashboardHO />
            </ReqUserAuth>} />
            <Route path='/usergendash' element={<ReqUserAuth>
              <UserDashboardGeneral />
            </ReqUserAuth>} />
            <Route path='/userbuyman' element={<ReqUserAuth>
              <UserBuyerManage />
            </ReqUserAuth>} />
            <Route path='/usersellman' element={<ReqUserAuth>
              <UserSellerManage />
            </ReqUserAuth>} />
            <Route path='/usercomman' element={<ReqUserAuth>
              <UserCompanyManage />
            </ReqUserAuth>} />
            <Route path='/userconman' element={<ReqUserAuth>
              <UserConsignmentManage />
            </ReqUserAuth>} />
            <Route path='/uservecman' element={<ReqUserAuth>
              <UserVechicleManage />
            </ReqUserAuth>} />
          </Routes>
        </UserAuthProvider>
      </div>
    </Router>
  );
}

export default App;
