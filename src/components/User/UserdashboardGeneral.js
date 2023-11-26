import React from 'react'
import './UserdashboardGeneral.css';
import background from '../images/Desktop.png';
import mc from '../images/mc.png';
import mu from '../images/mu.png';
import { useUserAuth } from './UserAuth';
import { useNavigate } from 'react-router-dom';

function UserDashboardGeneral() {
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
     <div className='user-dashboard-general'>
     <div className='user-logout-general'>
        <div className='user-logout-box-general'>
          <div className='user-logout-container-general'>
            <div className='user-logout-button-general'>
              <button className='user-logout-button-value-general'  onClick={handleLogout}>
                LOGOUT
              <img className='user-logout-icon-general' src={mu} alt='icon'/>
              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='user-dashboard-title-general'>MAIN MENU</h1>
          <div className='user-dashboard-buttons-general'>
            <div className='user-dashboard-buttons-row-general'>
              <button className='user-dashboard-button-general' onClick={() => navigate('/userconman')}>
                <div className='user-card-box-general'>
                  <img src={mc} alt='mc' className='user-dashboard-button-icon-general' />
                  <span>MANAGE CONSIGNMENT</span>
                </div>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserDashboardGeneral