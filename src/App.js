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
import AdminReports from './components/Admin/AdminReport';
import AdminInvoiceManagement from './components/Admin/AdminInvoiceManager';
import AdminCreateInvoice from './components/Admin/AdminCreateInvoice';
import AdminInvoiceDashboard from './components/Admin/AdminInvoiceDashboard';
import StaffReports from './components/Staff/StaffReport';
import StaffCreateInvoice from './components/Staff/StaffCreateInvoice';
import StaffInvoiceManagement from './components/Staff/StaffInvoiceManage';
import StaffInvoiceDashboard from './components/Staff/StaffInvoiceDashboard';
import UserInvoiceDashboard from './components/User/UserInvoiceDashboard';
import UserInvoiceManagement from './components/User/UserInvoiceManage';
import UserReports from './components/User/UserReport';
import UserCreateInvoice from './components/User/UserCreateInvoice';


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
                {/* responsive */}
                <AdminDashboard />
              </ReqAdminAuth>
            } />
            <Route path='/admininvdash' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminInvoiceDashboard />
              </ReqAdminAuth>
            } />
            <Route path='/adminbuyman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminBuyerManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminsellman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminSellerManage />
              </ReqAdminAuth>
            } />
            <Route path='/admincomman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminCompanyManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminconman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminConsignmentManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminstaffman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminStaffManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminuserman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminUserManage />
              </ReqAdminAuth>
            } />
            <Route path='/adminvecman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminVechicleManage />
              </ReqAdminAuth>
            } />
            <Route path='/admingenrep' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminReports />
              </ReqAdminAuth>
            } />
            <Route path='/admininman' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminInvoiceManagement />
                </ReqAdminAuth>
            } />
            <Route path='/admincreinv' element={
              <ReqAdminAuth>
                {/* responsive */}
                <AdminCreateInvoice />
                </ReqAdminAuth>
            } />
          </Routes>
        </AdminAuthProvider>

        {/* Staff Routes */}
        <StaffAuthProvider>
          <Routes>
            <Route path='/staff' element={<StaffLogin />} />
            <Route path='/staffinvdash' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffInvoiceDashboard />
            </ReqStaffAuth>
          } />
            <Route path='/staffsuperdash' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffDashboard />
            </ReqStaffAuth>
          } />
            <Route path='/staffhodash' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffDashboardHO />
            </ReqStaffAuth>
          } />
            <Route path='/staffgendash' element={
            <ReqStaffAuth>
              <StaffDashboardGeneral />
            </ReqStaffAuth>
          } />
            <Route path='/staffbuyman' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffBuyerManage />
            </ReqStaffAuth>
          } />
            <Route path='/staffcrein' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffCreateInvoice />
            </ReqStaffAuth>
          } />
            <Route path='/staffinman' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffInvoiceManagement />
            </ReqStaffAuth>
          } />
            <Route path='/staffgenrep' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffReports />
            </ReqStaffAuth>
          } />
            <Route path='/staffsellman' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffSellerManage />
            </ReqStaffAuth>
          } />
            <Route path='/staffcomman' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffCompanyManage />
            </ReqStaffAuth>
          } />
            <Route path='/staffconman' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffConsignmentManage />
            </ReqStaffAuth>
          } />
            <Route path='/staffvecman' element={
            <ReqStaffAuth>
              {/* responsive */}
              <StaffVechicleManage />
            </ReqStaffAuth>
          } />

          </Routes>
          

        </StaffAuthProvider>

        {/* User Routes */}
        <UserAuthProvider>
          <Routes>
            <Route path='/user' element={<UserLogin />} />
            <Route path='/userinvdash' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserInvoiceDashboard />
            </ReqUserAuth>
            } />
            <Route path='/usersuperdash' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserDashboard />
            </ReqUserAuth>
          } />
            <Route path='/userhodash' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserDashboardHO />
            </ReqUserAuth>
          } />
            <Route path='/usergendash' element={
            <ReqUserAuth>
              <UserDashboardGeneral />
            </ReqUserAuth>
          } />
            <Route path='/userbuyman' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserBuyerManage />
            </ReqUserAuth>
          } />
            <Route path='/usersellman' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserSellerManage />
            </ReqUserAuth>
          } />
            <Route path='/usercomman' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserCompanyManage />
            </ReqUserAuth>
          } />
            <Route path='/userconman' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserConsignmentManage />
            </ReqUserAuth>
          } />
            <Route path='/uservecman' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserVechicleManage />
            </ReqUserAuth>
          } />
            <Route path='/userinman' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserInvoiceManagement />
            </ReqUserAuth> 
          } />
            <Route path='/usergenrep' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserReports />
            </ReqUserAuth>
           } />
            <Route path='/usercrein' element={
            <ReqUserAuth>
              {/* responsive */}
              <UserCreateInvoice />
            </ReqUserAuth>
           } />
          </Routes>
        </UserAuthProvider>
      </div>
    </Router>
  );
}

export default App;
