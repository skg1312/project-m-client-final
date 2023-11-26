import React from 'react'
import './UserInvoiceDashboard.css'
import background from '../images/Desktop.png';
import gr from '../images/gr.png';
import ad from '../images/ad.png';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuth';

function UserInvoiceDashboard() {
  const navigate = useNavigate();
  const auth = useUserAuth();
    const dashboard = () => {
        switch (auth.access) {
            case 'Super-User':
          navigate('/usersuperdash');
          break;
        case 'HO-User':
          navigate('/userhodash');
          break;
        case 'User':
          navigate('/usergendash');
          break;
        default:
          break;
        }
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
     <div className='admin-in-dashboard'>
     <div className='admin-in-logout'>
        <div className='admin-in-logout-box'>
          <div className='admin-in-logout-container'>
            <div className='admin-in-logout-button'>
              <button className='admin-in-logout-button-value'  onClick={dashboard}>
                DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='admin-in-dashboard-title'>MAIN MENU</h1>
          <div className='admin-in-dashboard-buttons'>
            <div className='admin-in-dashboard-buttons-row'>
              <button className='admin-in-dashboard-button' onClick={() => navigate('/userinman')}>
                <div className='admin-in-card-box'>
                  <img src={gr} alt='gr' className='admin-in-dashboard-button-icon' />
                  <span>INOVICE MANAGEMENT</span>
                </div>
              </button>
              <button className='admin-in-dashboard-button' onClick={() => navigate('/usercrein')}>
                <div className='admin-in-card-box'>
                  <img src={ad} alt='mu' className='admin-in-dashboard-button-icon' />
                  <span>CREATE INVOICE</span>
                </div>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default  UserInvoiceDashboard