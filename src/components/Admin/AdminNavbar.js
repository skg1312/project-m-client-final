import React from "react";
import './AdminNavbar.css';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuth';

function AdminNavbar() {
    const navigate = useNavigate();
    const auth = useAdminAuth();

  const handleLogout = () => {
    auth.adminlogout();
}

    return (
        <div className='admin-logout-box-nav'>
          <div className='admin-logout-container-nav'>
            <div className='admin-logout-button-nav'>
            <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/admingenrep')}>
                REPORTS
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminuserman')}>
                USERS
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminstaffman')}>
                STAFF
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/admincomman')}>
                COMPANY
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminsellman')}>
                AGENT
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminbuyman')}>
                BUYER
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminconman')}>
                CONSIGNMENT
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminvecman')}>
                LOADING
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/admininvdash')}>
                INOVICE
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/admindashboard')}>
                DASHBOARD
              </button>
                <button className='admin-logout-button-value-no-img'  onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
    )
    }

export default AdminNavbar;
