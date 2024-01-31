import React from 'react';
import '../Admin/AdminNavbar.css';
import { useNavigate } from 'react-router-dom';
import { useStaffAuth } from './StaffAuth';

function StaffNavbar() {
  const navigate = useNavigate();
  const auth = useStaffAuth();
  const dashboard = () => {
      switch (auth.access) {
          case 'Super-Staff':
        navigate('/staffsuperdash');
        break;
      case 'HO-Staff':
        navigate('/staffhodash');
        break;
      case 'Staff':
        navigate('/staffgendash');
        break;
      default:
        break;
      }
  }
	const handleLogout = () => {
		auth.stafflogout();
	};

	return (
		<div className='admin-logout-box-nav'>
			<div className='admin-logout-container-nav'>
				<div className='admin-logout-button-nav'>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffgenrep')}
					>
						REPORTS
					</button>
{/*
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/adminuserman')}
					>
						USERS
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/adminstaffman')}
					>
						STAFF
					</button>
          */}
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffcomman')}
					>
						COMPANY
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffsellman')}
					>
						CONSIGNEE
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffbuyman')}
					>
						BUYER
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffconman')}
					>
						ITEMS
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffvecman')}
					>
						OTHERS
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffinvdash')}
					>
						INOVICE
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={dashboard}
					>
						DASHBOARD
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={handleLogout}
					>
						LOGOUT
					</button>
				</div>
			</div>
		</div>
	);
}

export default StaffNavbar;
