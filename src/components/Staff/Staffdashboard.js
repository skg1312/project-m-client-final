import React from 'react'
import './Staffdashboard.css'
import background from '../images/Desktop.png';
import gr from '../images/gr.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import mv from '../images/mv.png';
import mi from '../images/mi.png';
import ms from '../images/ms.png';
import vs from '../images/vs.png';
import {useStaffAuth } from './StaffAuth';
import { useNavigate } from 'react-router-dom';

function StaffDashboard() {
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
     <div className='staff-dashboard'>
     <div className='staff-logout'>
        <div className='staff-logout-box'>
          <div className='staff-logout-container'>
            <div className='staff-logout-button'>
              <button className='staff-logout-button-value'  onClick={handleLogout}>
                LOGOUT
              <img className='staff-logout-icon' src={mu} alt='icon'/>

              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='staff-dashboard-title'>MAIN MENU</h1>
          <div className='staff-dashboard-buttons'>
            <div className='staff-dashboard-buttons-row'>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffgenrep')}>
                <img src={gr} alt='gr' className='staff-dashboard-button-icon' />
                GENERATE REPORTS
                </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffsellman')}>
                <img src={ms} alt='mu' className='staff-dashboard-button-icon' />
                MANAGE SELLERS
                </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffbuyman')}>
                <img src={ms} alt='ms' className='staff-dashboard-button-icon' />
                MANAGE BUYERS
                </button>
                <button className='staff-dashboard-button' onClick={() => navigate('/staffconman')}>
                <img src={mu} alt='ms' className='staff-dashboard-button-icon' />
                MANAGE COMPANY
                </button>
            </div>
            <div className='staff-dashboard-buttons-row'>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffvecman')}>
                <img src={vs} alt='mv' className='staff-dashboard-button-icon' />
                MANAGE VECHICLES
                </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffinman')}>
                <img src={mi} alt='mi' className='staff-dashboard-button-icon' />
                MANAGE INVOICE
                </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffcomman')}>
                <img src={mc} alt='mc' className='staff-dashboard-button-icon' />
                MANAGE CLIENT
                </button>
                <button className='staff-dashboard-button' onClick={() => navigate('/staffconman')}>
                <img src={mv} alt='mc' className='staff-dashboard-button-icon' />
                MANAGE CONSIGNMENT
                </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StaffDashboard