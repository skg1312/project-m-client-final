import React from 'react'
import './AdminInvoiceDashboard.css'
import background from '../images/Desktop.png';
import gr from '../images/gr.png';
import ad from '../images/ad.png';
import { useNavigate } from 'react-router-dom';

function AdminInvoiceDashboard() {
  const navigate = useNavigate();
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
              <button className='admin-in-logout-button-value'  onClick={() => navigate('/admindashboard')}>
                DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </div>
        <h1 className='admin-in-dashboard-title'>MAIN MENU</h1>
          <div className='admin-in-dashboard-buttons'>
            <div className='admin-in-dashboard-buttons-row'>
              <button className='admin-in-dashboard-button' onClick={() => navigate('/admininman')}>
                <img src={gr} alt='gr' className='admin-in-dashboard-button-icon' />
                INOVICE MANAGEMENT
              </button>
              <button className='admin-in-dashboard-button' onClick={() => navigate('/admincreinv')}>
                <img src={ad} alt='mu' className='admin-in-dashboard-button-icon' />
                CREATE INVOICE
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default  AdminInvoiceDashboard