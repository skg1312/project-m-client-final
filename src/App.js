import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './components/Admin/AdminAuth';
import ReqAdminAuth from './components/Admin/AdminReqAuth';
import AdminLogin from './components/Admin/Adminlogin';//responsive
import AdminDashboard from './components/Admin/Admindashboard';//responsive
import { StaffAuthProvider } from './components/Staff/StaffAuth';
import ReqStaffAuth from './components/Staff/StaffReqAuth';
import StaffLogin from './components/Staff/Stafflogin';//responsive
import StaffDashboardHO from './components/Staff/StaffdashboardHO';//responsive
import StaffDashboardGeneral from './components/Staff/StaffdashboardGeneral';//responsive
import StaffDashboard from './components/Staff/Staffdashboard';//responsive
import { UserAuthProvider } from './components/User/UserAuth';
import ReqUserAuth from './components/User/UserReqAuth';
import UserLogin from './components/User/Userlogin';//responsive
import UserDashboard from './components/User/Userdashboard';//responsive
import UserDashboardHO from './components/User/UserdashboardHO';//responsive
import UserDashboardGeneral from './components/User/UserdashboardGeneral';//responsive
import AdminBuyerManage from './components/Admin/AdminBuyerManage';//responsive
import AdminSellerManage from './components/Admin/AdminSellerManage';//responsive
import AdminCompanyManage from './components/Admin/AdminCompanyManage';//responsive
import AdminConsignmentManage from './components/Admin/AdminConsignmnetManage';//responsive
import AdminStaffManage from './components/Admin/AdminStaffManage';//responsive
import AdminUserManage from './components/Admin/AdminUserManage';//responsive
import StaffBuyerManage from './components/Staff/StaffBuyerManage';//responsive
import StaffSellerManage from './components/Staff/StaffSellerManage';//responsive
import StaffCompanyManage from './components/Staff/StaffCompanyManage';//responsive
import StaffConsignmentManage from './components/Staff/StaffConsignmentManage';//responsive
import StaffVechicleManage from './components/Staff/StaffVechicleManage';//responsive
import UserBuyerManage from './components/User/UserBuyerManage';//responsive
import UserSellerManage from './components/User/UserSellerManage';//responsive
import UserCompanyManage from './components/User/UserCompanyManage';//responsive
import UserConsignmentManage from './components/User/UserConsignmentManage';//responsive
import UserVechicleManage from './components/User/UserVechicleManage';//responsive
import AdminVechicleManage from './components/Admin/AdminVechicleManage';//responsive
import AdminReports from './components/Admin/AdminReport';//responsive
import AdminInvoiceManagement from './components/Admin/AdminInvoiceManager';//responsive
import AdminCreateInvoice from './components/Admin/AdminCreateInvoice';//responsive
import AdminInvoiceDashboard from './components/Admin/AdminInvoiceDashboard';//responsive
import StaffReports from './components/Staff/StaffReport';//responsive
import StaffCreateInvoice from './components/Staff/StaffCreateInvoice';//responsive
import StaffInvoiceManagement from './components/Staff/StaffInvoiceManage';//responsive
import StaffInvoiceDashboard from './components/Staff/StaffInvoiceDashboard';//responsive
import UserInvoiceDashboard from './components/User/UserInvoiceDashboard';//responsive
import UserInvoiceManagement from './components/User/UserInvoiceManage';//responsive
import UserReports from './components/User/UserReport';//responsive
import UserCreateInvoice from './components/User/UserCreateInvoice';//responsive


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
            <Route path='/admininvdash' element={
              <ReqAdminAuth>
                <AdminInvoiceDashboard />
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
            <Route path='/admingenrep' element={
              <ReqAdminAuth>
                <AdminReports />
              </ReqAdminAuth>
            } />
            <Route path='/admininman' element={
              <ReqAdminAuth>
                <AdminInvoiceManagement />
                </ReqAdminAuth>
            } />
            <Route path='/admincreinv' element={
              <ReqAdminAuth>
                <AdminCreateInvoice />
                </ReqAdminAuth>
            } />
          </Routes>
        </AdminAuthProvider>

        {/* Staff Routes */}
        <StaffAuthProvider>
          <Routes>
            <Route path='/staff' element={<StaffLogin />} />
            <Route path='/staffinvdash' element={<ReqStaffAuth>
              <StaffInvoiceDashboard />
            </ReqStaffAuth>} />
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
            <Route path='/staffcrein' element={<ReqStaffAuth>
              <StaffCreateInvoice />
            </ReqStaffAuth>} />
            <Route path='/staffinman' element={<ReqStaffAuth>
              <StaffInvoiceManagement />
            </ReqStaffAuth>} />
            <Route path='/staffgenrep' element={<ReqStaffAuth>
              <StaffReports />
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
            <Route path='/userinvdash' element={<ReqUserAuth>
            <UserInvoiceDashboard />
            </ReqUserAuth>
            } />
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
            <Route path='/userinman' element={<ReqUserAuth>
              <UserInvoiceManagement />
            </ReqUserAuth> } />
            <Route path='/usergenrep' element={<ReqUserAuth>
              <UserReports />
            </ReqUserAuth> } />
            <Route path='/usercrein' element={<ReqUserAuth>
              <UserCreateInvoice />
            </ReqUserAuth> } />
          </Routes>
        </UserAuthProvider>
      </div>
    </Router>
  );
}

export default App;
