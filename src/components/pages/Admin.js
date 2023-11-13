import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '../Admin/AdminAuth';
import ReqAdminAuth from '../Admin/AdminReqAuth';
import AdminLogin from '../Admin/Adminlogin';
import AdminDashboard from '../Admin/Admindashboard';

function Admin() {
  return (
    <div className="Admin">
      <AdminAuthProvider>
          <Routes>
            <Route path='/' element={<AdminLogin />} />
            <Route path='/dashboard' element={
              <ReqAdminAuth>
                <AdminDashboard />
              </ReqAdminAuth>
            } />
          </Routes>
      </AdminAuthProvider>
    </div>
  );
}

export default Admin;
