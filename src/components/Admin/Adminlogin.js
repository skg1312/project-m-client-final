import React, { useState } from 'react';
import './Adminlogin.css';
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from './AdminAuth';
import background from '../images/background.png';

function AdminLogin() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userlist, setUserlist] = useState(true);

  const login = (event) => {
    let matchFound = false;
    auth.adminlist.forEach((item) => {
      if (item.adminemail === Email && item.adminpassword === password) {
        matchFound = true;
        return;
      }
    });

    if (matchFound) {
      auth.adminlogin(Email, password);
      navigate('/admindashboard');
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
      <div className='Admin-login-container'>
        <div className='Admin-login'>
          <h2 className='Admin-login-head'>LOGIN</h2>
          <div className='Admin-login-form'>
            <div className='Admin-login-email'>
              <h3 className='Admin-label'>Email</h3>
              <input
                type='email'
                placeholder='Email'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className='Admin-login-input'
              />
            </div>
            <div className='Admin-login-password'>
              <h3 className='Admin-label'>Password</h3>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='Admin-login-input'
              />
            </div>
            <div className='Admin-login-button'>
              <button onClick={login} className='Admin-login-button-value'>
                Login
              </button>
            </div>
            <div className='Admin-login-not-req'>
              <p className='Admin-login-not'>Not Admin? 
                <a className ='admin-a' href='/staff'>staff</a>
                <a  className ='admin-a' href='/user'>user</a>
              </p>
            </div>
            <div className='Admin-login-error'>
              {!userlist ? <h3 id='invalid'>Invalid username or password</h3> : ''}
            </div>
          </div>
        </div>
        <div className='Admin-login-content'>
          <div className='Admin-login-content-head'>
            <h2>Welcome</h2>
          </div>
          <div className='Admin-login-content-body'>
            <h3>Admin</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
