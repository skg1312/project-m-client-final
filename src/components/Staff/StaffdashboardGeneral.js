import React from 'react'
import './StaffdashboardGeneral.css'
import background from '../images/Desktop.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import mi from '../images/mi.png';
import ms from '../images/ms.png';
import {useStaffAuth } from './StaffAuth';
import { useNavigate } from 'react-router-dom';
function StaffDashboardGeneral() {
    const auth = useStaffAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      auth.stafflogout();
    }
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
     <div className='staff-dashboard-general'>
     <div className='staff-logout-general'>
        <div className='staff-logout-box-general'>
          <div className='staff-logout-container-general'>
            <div className='staff-logout-button-general'>
              <button className='staff-logout-button-value-general'  onClick={handleLogout}>
                LOGOUT
              <img className='staff-logout-icon-general' src={mu} alt='icon'/>
              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='staff-dashboard-title-general'>MAIN MENU</h1>
          <div className='staff-dashboard-buttons-general'>
            <div className='staff-dashboard-buttons-row-general'>
              <button className='staff-dashboard-button-general' onClick={() => navigate('/staffsellman')}>
                <div className='staff-card-box-general'>
                  <img src={mu} alt='mu' className='staff-dashboard-button-icon-general' />
                  <span>MANAGE SELLERS</span>
                </div>
              </button>
              <button className='staff-dashboard-button-general' onClick={() => navigate('/staffbuyman')}>
                <div className='staff-card-box-general'>
                  <img src={ms} alt='ms' className='staff-dashboard-button-icon-general' />
                  <span>MANAGE BUYERS</span>
                </div>
              </button>
              <button className='staff-dashboard-button-general' onClick={() => navigate('/staffinvdash')}>
                <div className='staff-card-box-general'>
                  <img src={mi} alt='mi' className='staff-dashboard-button-icon-general' />
                  <span>MANAGE INVOICE</span>
                </div>
              </button>
              <button className='staff-dashboard-button-general' onClick={() => navigate('/staffconman')}>
                <div className='staff-card-box-general'>
                  <img src={mc} alt='mc' className='staff-dashboard-button-icon-general' />
                  <span>MANAGE CONSIGNMENT</span>
                </div>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StaffDashboardGeneral