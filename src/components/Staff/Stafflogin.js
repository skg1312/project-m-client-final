import React, { useState } from 'react';
import './Stafflogin.css';
import { useNavigate } from "react-router-dom";
import { useStaffAuth } from './StaffAuth';
import background from '../images/background.png';

function StaffLogin() {
  const auth = useStaffAuth();
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userlist, setUserlist] = useState(true);
  let access = '';
  const login = (event) => {
    let matchFound = false;
    auth.stafflist.forEach((item) => {
      if (item.staffemail === Email && item.staffpassword === password) {
        matchFound = true;
        access = item.staffaccess;
        return;
      }
    });

    if (matchFound) {
      auth.stafflogin(Email, password, access);
      auth.setStaffAccess(access);
      switch (access) {
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
      <div className='staff-login-container'>
        <div className='staff-login'>
          <h2 className='staff-login-head'>LOGIN</h2>
          <div className='staff-login-form'>
            <div className='staff-login-email'>
              <h3 className='staff-label'>Email</h3>
              <input
                type='email'
                placeholder='Email'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className='staff-login-input'
              />
            </div>
            <div className='staff-login-password'>
              <h3 className='staff-label'>Password</h3>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='staff-login-input'
              />
            </div>
            <div className='staff-login-button'>
              <button onClick={login} className='staff-login-button-value'>
                Login
              </button>
            </div>
            <div className='staff-login-not-req'>
              <p className='staff-login-not'>Not Staff? 
                <a className ='staff-a' href='/'>admin</a>
                <a  className ='staff-a' href='/user'>user</a>
              </p>
            </div>
            <div className='staff-login-error'>
              {!userlist ? <h3 id='invalid'>Invalid username or password</h3> : ''}
            </div>
          </div>
        </div>
        <div className='staff-login-content'>
          <div className='staff-login-content-head'>
            <h2>Welcome</h2>
          </div>
          <div className='staff-login-content-body'>
            <h3>Staff</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;
