import React from "react";
import './AdminNavbar.css';
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {
    const navigate = useNavigate();
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
                SELLER
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminbuyman')}>
                BUYER
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminconman')}>
                CONSIGNMENT
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/adminvecman')}>
                VEHICLES
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/admininvdash')}>
                INOVICE
              </button>
              <button className='admin-logout-button-value-no-img'  onClick={() => navigate('/admindashboard')}>
                DASHBOARD
              </button>
            </div>
          </div>
        </div>
    )
    }

export default AdminNavbar;