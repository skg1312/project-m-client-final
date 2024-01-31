import React from 'react';
import '../Admin/AdminNavbar.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuth';

function UserNavbar() {
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
	};

	const handleLogout = () => {
		auth.userlogout();
	};

	return (
		<div className='admin-logout-box-nav'>
			<div className='admin-logout-container-nav'>
				<div className='admin-logout-button-nav'>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/usergenrep')}
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
         
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/staffcomman')}
					>
						COMPANY
					</button>
					 */}
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/usersellman')}
					>
						CONSIGNEE
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/userbuyman')}
					>
						BUYER
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/userconman')}
					>
						ITEMS
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/uservecman')}
					>
						OTHERS
					</button>
					<button
						className='admin-logout-button-value-no-img'
						onClick={() => navigate('/userinvdash')}
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

export default UserNavbar;
