import React, { useState } from 'react';
import './Userlogin.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuth';
import background from '../images/background.png';

function UserLogin() {
	const auth = useUserAuth();
	const navigate = useNavigate();
	const [Email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userlist, setUserlist] = useState(true);
	let access = '';

	const login = (event) => {
		let matchFound = false;
		auth.userlist.forEach((item) => {
			if (item.useremail === Email && item.userpassword === password) {
				matchFound = true;
				access = item.useraccess;
				return;
			}
		});

		if (matchFound) {
			auth.userlogin(Email, password, access);
			auth.setUserAccess(access);
			switch (access) {
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
		} else {
			setUserlist(false);
		}
		event.preventDefault();
	};

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div className='user-login-container'>
				<div className='user-login'>
					<h2 className='user-login-head'>LOGIN</h2>
					<div className='user-login-form'>
						<div className='user-login-email'>
							{/* <h3 className='user-label'>Email</h3> */}
							<input
								type='email'
								placeholder='Email'
								value={Email}
								onChange={(e) => setEmail(e.target.value)}
								className='user-login-input'
							/>
						</div>
						<div className='user-login-password'>
							{/* <h3 className='user-label'>Password</h3> */}
							<input
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='user-login-input'
							/>
						</div>
						<div className='user-login-button'>
							<button onClick={login} className='user-login-button-value'>
								Login
							</button>
						</div>
						<div className='staff-login-not-req'>
							<p className='staff-login-not'>
								Not User?
								<a className='user-a' href='/'>
									admin
								</a>
								<a className='user-a' href='/staff'>
									staff
								</a>
							</p>
						</div>
						<div className='user-login-error'>
							{!userlist ? (
								<h3 id='invalid'>Invalid username or password</h3>
							) : (
								''
							)}
						</div>
					</div>
				</div>
				<div className='user-login-content'>
					<div className='user-login-content-head'>
						<h2>Welcome</h2>
					</div>
					<div className='user-login-content-body'>
						<h3>User</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserLogin;
