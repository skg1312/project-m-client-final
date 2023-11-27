import React from 'react'
import './Userdashboard.css'
import background from '../images/Desktop.png';
import gr from '../images/gr.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import mv from '../images/mv.png';
import mi from '../images/mi.png';
import ms from '../images/ms.png';
import { useUserAuth } from './UserAuth';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const auth = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.userlogout();
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
     <div className='user-dashboard'>
     <div className='user-logout'>
        <div className='user-logout-box'>
          <div className='user-logout-container'>
            <div className='user-logout-button'>
              <button className='user-logout-button-value'  onClick={handleLogout}>
                LOGOUT
              <img className='user-logout-icon' src={mu} alt='icon'/>

              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='user-dashboard-title'>MAIN MENU</h1>
          <div className='user-dashboard-buttons'>
            <div className='user-dashboard-buttons-row'>
              <button className='user-dashboard-button' onClick={() => navigate('/usercomman')}>
                <div className='user-card-box'>
                  <img src={gr} alt='gr' className='user-dashboard-button-icon' />
                  <span>MANAGE COMPANY</span>
                </div>
              </button>
              <button className='user-dashboard-button' onClick={() => navigate('/usersellman')}>
                <div className='user-card-box'>
                  <img src={mu} alt='mu' className='user-dashboard-button-icon' />
                  <span>MANAGE SELLERS</span>
                </div>
              </button>
              <button className='user-dashboard-button' onClick={() => navigate('/userbuyman')}>
                <div className='user-card-box'>
                  <img src={ms} alt='ms' className='user-dashboard-button-icon' />
                  <span>MANAGE BUYERS</span>
                </div>
              </button>
              <button className='user-dashboard-button' onClick={() => navigate('/uservecman')}>
                <div className='user-card-box'>
                  <img src={mv} alt='mv' className='user-dashboard-button-icon' />
                  <span>MANAGE VEHICLES</span>
                </div>
              </button>
              <button className='user-dashboard-button' onClick={() => navigate('/userinvdash')}>
                <div className='user-card-box'>
                  <img src={mi} alt='mi' className='user-dashboard-button-icon' />
                  <span>MANAGE INVOICE</span>
                </div>
              </button>
              <button className='user-dashboard-button'onClick={() => navigate('/userconman')}>
                <div className='user-card-box'>
                  <img src={mc} alt='mc' className='user-dashboard-button-icon' />
                  <span>MANAGE CONSIGNMENT</span>
                </div>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserDashboard