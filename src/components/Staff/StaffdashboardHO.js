import React from 'react'
import './StaffdashboardHO.css'
import background from '../images/Desktop.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import mv from '../images/mv.png';
import mi from '../images/mi.png';
import ms from '../images/ms.png';
import {useStaffAuth } from './StaffAuth';
import { useNavigate } from 'react-router-dom';
function StaffDashboardHO() {
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
     <div className='staff-dashboard-HO'>
     <div className='staff-logout-HO'>
        <div className='staff-logout-box-HO'>
          <div className='staff-logout-container-HO'>
            <div className='staff-logout-button-HO'>
              <button className='staff-logout-button-value-HO'  onClick={handleLogout}>
                LOGOUT
              <img className='staff-logout-icon-HO' src={mu} alt='icon'/>
              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='staff-dashboard-title-HO'>MAIN MENU</h1>
          <div className='staff-dashboard-buttons-HO'>
            <div className='staff-dashboard-buttons-row-HO'>
              <button className='staff-dashboard-button-HO' onClick={() => navigate('/staffsellman')}>
                <img src={mu} alt='mu' className='staff-dashboard-button-icon-HO' />
                MANAGE SELLERS
                </button>
              <button className='staff-dashboard-button-HO' onClick={() => navigate('/staffbuyman')}>
                <img src={ms} alt='ms' className='staff-dashboard-button-icon-HO' />
                MANAGE BUYERS
                </button>
                <button className='staff-dashboard-button-HO' onClick={() => navigate('/staffcomman')}>
                <img src={ms} alt='ms' className='staff-dashboard-button-icon-HO' />
                MANAGE COMPANY
                </button>
            </div>
            <div className='staff-dashboard-buttons-row-HO'>
              <button className='staff-dashboard-button-HO' onClick={() => navigate('/staffvecman')}>
                <img src={mv} alt='mv' className='staff-dashboard-button-icon-HO' />
                MANAGE VECHICLES
                </button>
              <button className='staff-dashboard-button-HO' onClick={() => navigate('/staffinman')}>
                <img src={mi} alt='mi' className='staff-dashboard-button-icon-HO' />
                MANAGE INVOICE
                </button>
                <button className='staff-dashboard-button-HO' onClick={() => navigate('/staffconman')}>
                <img src={mc} alt='mc' className='staff-dashboard-button-icon-HO' />
                MANAGE CONSIGNMENT
                </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StaffDashboardHO