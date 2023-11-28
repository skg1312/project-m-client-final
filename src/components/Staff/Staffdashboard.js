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
                <div className='staff-card-box'>
                  <img src={gr} alt='gr' className='staff-dashboard-button-icon' />
                  <span>GENERATE REPORTS</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffsellman')}>
                <div className='staff-card-box'>
                  <img src={ms} alt='mu' className='staff-dashboard-button-icon' />
                  <span>MANAGE AGENTS</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffbuyman')}>
                <div className='staff-card-box'>
                  <img src={ms} alt='ms' className='staff-dashboard-button-icon' />
                  <span>MANAGE BUYERS</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffconman')}>
              <div className='staff-card-box'>
                <img src={mu} alt='ms' className='staff-dashboard-button-icon' />
                <span>MANAGE COMPANY</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffvecman')}>
                <div className='staff-card-box'>
                  <img src={vs} alt='mv' className='staff-dashboard-button-icon' />
                  <span>MANAGE VEHICLES</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffinvdash')}>
                <div className='staff-card-box'>
                  <img src={mi} alt='mi' className='staff-dashboard-button-icon' />
                  <span>MANAGE INVOICE</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffcomman')}>
                <div className='staff-card-box'>
                  <img src={mc} alt='mc' className='staff-dashboard-button-icon' />
                  <span>MANAGE CLIENT</span>
                </div>
              </button>
              <button className='staff-dashboard-button' onClick={() => navigate('/staffconman')}>
                <div className='staff-card-box'>
                  <img src={mv} alt='mc' className='staff-dashboard-button-icon' />
                  <span>MANAGE CONSIGNMENT</span>
                </div>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StaffDashboard