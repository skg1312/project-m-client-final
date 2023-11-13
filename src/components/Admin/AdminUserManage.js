import React, { useState, useEffect } from 'react';
import './AdminUserManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';

function AdminUserManage() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const API = process.env.REACT_APP_API;
  const [selectedUserData, setSelectedUserData] = useState({
    username: '',
    useremail: '',
    userpassword: '',
    userphone: '',
    useraccess: '',
    useridproof: '',
    useraddress: '',
  });

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');

  // Sort the user array in reverse order (newest first)
  const sortedUsers = [...users].reverse();
  const displayedUserSearch = sortedUsers
  .filter(
    (item) =>
      item.username.toLowerCase().includes(searchInput.toLowerCase()))
  .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const pageCount = Math.ceil(users.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}user`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [API]);

  const handleUserUpdate = (userUpdateId) => {
    setSelectedUserId(userUpdateId);
    const selectedUser = users.find((user) => user._id === userUpdateId);
    setSelectedUserData({ ...selectedUser });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedUserId) {
      // Update an existing user
      axios
        .put(`${API}user/${selectedUserId}`, selectedUserData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('User updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === selectedUserId ? response.data : user))
          );
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      // Create a new user
      axios
        .post(`${API}user`, selectedUserData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('User created successfully:', response.data);
          // Optionally, you can update the local state to include the new user
          setUsers((prevUsers) => [...prevUsers, response.data]);
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    }
   

    setSelectedUserData({
      username: '',
      useremail: '',
      userpassword: '',
      userphone: '',
      useraccess: '',
      useridproof: '',
      useraddress: '',
    });

    setSelectedUserId(null);
  };
 
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <AdminNavbar />
      <div className='admin-user-manage'>
      
        <div className='admin-user-manage-data'>
          <h1 className='admin-user-manage-data-title'>ALL USERS</h1>
          <input
              type='text'
              placeholder='Search User...'
              className='admin-user-manage-form-input' // Search input placeholder
              value={searchInput} // Bind the input value to the state
              onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
            />
          <table className='admin-user-manage-data-table'>
            <thead className='admin-user-manage-data-table-head'>
              <tr className='admin-user-manage-data-table-row-head'>
                <th className='admin-user-manage-data-table-header'>User ID</th>
                <th className='admin-user-manage-data-table-header'>Username</th>
                <th className='admin-user-manage-data-table-header'>Email</th>
                <th className='admin-user-manage-data-table-header'>Phone</th>
                <th className='admin-user-manage-data-table-header'>Access</th>
                <th className='admin-user-manage-data-table-header'>Action</th>
              </tr>
            </thead>
            <tbody className='admin-user-manage-data-table-body'>
              {displayedUserSearch.map((user) => (
                <tr key={user._id} className='admin-user-manage-data-table-row-body'>
                  <td className='admin-user-manage-data-table-data highlight'>{user.username.substring(0, 12)}</td>
                  <td className='admin-user-manage-data-table-data'>{user.useremail.substring(0, 18)}</td>
                  <td className='admin-user-manage-data-table-data'>{user.userphone}</td>
                  <td className='admin-user-manage-data-table-data'>{user.useraccess.substring(0, 12)}</td>
                  <td className='admin-user-manage-data-table-data'>{user.useridproof.substring(0, 12)}</td>
                  <td className='admin-user-manage-data-table-data'>
                    <button
                      className='admin-user-manage-data-table-button'
                      onClick={() => handleUserUpdate(user._id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <ReactPaginate
            className='pagination-container'
            previousLabel='Previous'
            nextLabel='Next'
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName='pagination'
            previousLinkClassName='previous-page'
            nextLinkClassName='next-page'
            disabledClassName='pagination-button disabled'
            activeClassName='pagination-button active'
            pageClassName='pagination-button'
            breakClassName='pagination-space'
          />
        </div>
        <div className='admin-user-manage-form'>
          <h1 className='admin-user-manage-form-title'>{selectedUserId ? 'UPDATE USER' : 'ADD USER'}</h1>
          <form className='admin-user-manage-form-form' onSubmit={handleFormSubmit}>
            <input
              type='text'
              required
              className='admin-user-manage-form-input'
              placeholder='Username'
              value={selectedUserData.username || ''}
              onChange={(e) => setSelectedUserData({ ...selectedUserData, username: e.target.value })}
            />
            <input
              type='email'
              required
              className='admin-user-manage-form-input'
              placeholder='Email'
              value={selectedUserData.useremail || ''}
              onChange={(e) => setSelectedUserData({ ...selectedUserData, useremail: e.target.value })}
            />
            <input
              type='password'
              required
              className='admin-user-manage-form-input'
              placeholder='Password'
              value={selectedUserData.userpassword || ''}
              onChange={(e) => setSelectedUserData({ ...selectedUserData, userpassword: e.target.value })}
            />
            <input
              type='tel'
              required
              maxLength='10'
              className='admin-user-manage-form-input'
              placeholder='Phone'
              value={selectedUserData.userphone || ''}
              onChange={(e) => setSelectedUserData({ ...selectedUserData, userphone: e.target.value })}
            />
            
            <select
            required
            className='admin-staff-manager-form-input'
            value={selectedUserData.useraccess || ''}
            onChange={(e) => setSelectedUserData({ ...selectedUserData, useraccess: e.target.value })}
          >
            <option value='Super-User'>Super-User</option>
            <option value='HO-User'>HO-User</option>
            <option value='User'>User</option>
          </select>
          
            <input
              type='text'
              required
              className='admin-user-manage-form-input'
              placeholder='ID Proof'
              value={selectedUserData.useridproof || ''}
              onChange={(e) => setSelectedUserData({ ...selectedUserData, useridproof: e.target.value })}
            />
            <input
              type='text'
              required
              className='admin-user-manage-form-input'
              placeholder='Address'
              value={selectedUserData.useraddress || ''}
              onChange={(e) => setSelectedUserData({ ...selectedUserData, useraddress: e.target.value })}
            />
            <br />
            <input type='checkbox' required className='admin-user-manage-form-input-checkbox' />
          <label className='admin-user-manage-form-input-checkbox-label'>
            I agree with Terms and Conditions & Privacy Policy
          </label>
            <br />
            <button type='submit' className='admin-user-manage-form-button'>
              {selectedUserId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManage;
