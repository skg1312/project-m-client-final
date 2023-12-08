import React, { useState, useEffect } from 'react';
import './AdminStaffManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';

function AdminStaffManage() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const API = process.env.REACT_APP_API;
  const [selectedStaffData, setSelectedStaffData] = useState({
    staffname: '',
    staffemail: '',
    staffpassword: '',
    staffphone: '',
    staffaccess: '',
    staffidproof: '',
    staffofficebranch: '',
  });

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');


  // Sort the staff members array in reverse order (newest first)
  const sortedStaffMembers = [...staffMembers].reverse();
  const displayedStaffSearch = sortedStaffMembers
  .filter(
    (item) =>
      item.staffname.toLowerCase().includes(searchInput.toLowerCase()))
  .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const pageCount = Math.ceil(sortedStaffMembers.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}staff`)
      .then((response) => {
        setStaffMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff member data:', error);
      });
  }, [API]);

  const handleStaffUpdate = (staffUpdateId) => {
    setSelectedStaffId(staffUpdateId);
    const selectedStaff = staffMembers.find((staff) => staff._id === staffUpdateId);
    setSelectedStaffData({ ...selectedStaff });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedStaffId) {
      // Update an existing staff member
      axios
        .put(`${API}staff/${selectedStaffId}`, selectedStaffData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Staff member updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setStaffMembers((prevStaffMembers) =>
            prevStaffMembers.map((staff) => (staff._id === selectedStaffId ? response.data : staff))
          );
          alert("Staff Details are Updated Successfully");
        })
        .catch((error) => {
          console.error('Error updating staff member:', error);
        });
    } else {
      // Create a new staff member
      axios
        .post(`${API}staff`, selectedStaffData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Staff member created successfully:', response.data);
          // Optionally, you can update the local state to include the new staff member
          setStaffMembers((prevStaffMembers) => [...prevStaffMembers, response.data]);
          alert("Staff Details are Saved Successfully");
        })
        .catch((error) => {
          console.error('Error creating staff member:', error);
        });
    }

    setSelectedStaffData({
      staffname: '',
      staffemail: '',
      staffpassword: '',
      staffphone: '',
      staffaccess: '',
      staffidproof: '',
      staffofficebranch: '',
    });

    setSelectedStaffId(null);
  };

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
      <AdminNavbar />
    <div className='admin-staff-manager'>
      <div className='admin-staff-manager-data'>
        <h1 className='admin-staff-manager-data-title'>ALL STAFF MEMBERS</h1>
        <input
              type='text'
              placeholder='Search Staff...'
              className='admin-user-manage-form-input' // Search input placeholder
              value={searchInput} // Bind the input value to the state
              onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
            />
        <table className='admin-staff-manager-data-table'>
          <thead className='admin-staff-manager-data-table-head'>
            <tr className='admin-staff-manager-data-table-row-head'>
              <th className='admin-staff-manager-data-table-header'>Staff Name</th>
              <th className='admin-staff-manager-data-table-header'>Email</th>
              <th className='admin-staff-manager-data-table-header'>Phone</th>
              <th className='admin-staff-manager-data-table-header'>Office Branch</th>
              <th className='admin-staff-manager-data-table-header'>Access</th>
              <th className='admin-staff-manager-data-table-header'>Action</th>
            </tr>
          </thead>
          <tbody className='admin-staff-manager-data-table-body'>
            {displayedStaffSearch.map((staff) => (
              <tr key={staff._id} className='admin-staff-manager-data-table-row-body'>
                <td className='admin-staff-manager-data-table-data highlight'>{staff.staffname.substring(0, 12)}</td>
                <td className='admin-staff-manager-data-table-data'>{staff.staffemail.substring(0, 18)}</td>
                <td className='admin-staff-manager-data-table-data'>{staff.staffphone}</td>
                <td className='admin-staff-manager-data-table-data'>
                  {staff.staffofficebranch.substring(0, 12)}
                </td>
                <td className='admin-staff-manager-data-table-data'>
                  {staff.staffaccess.substring(0, 12)}
                </td>
                <td className='admin-staff-manager-data-table-data'>
                  <button
                    className='admin-staff-manager-data-table-button'
                    onClick={() => handleStaffUpdate(staff._id)}
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
      <div className='admin-staff-manager-form'>
        <h1 className='admin-staff-manager-form-title'>{selectedStaffId ? 'UPDATE STAFF' : 'ADD STAFF'}</h1>
        <form className='admin-staff-manager-form-form' onSubmit={handleFormSubmit}>
          <input
            type='text'
            required
            className='admin-staff-manager-form-input'
            placeholder='Staff Name'
            value={selectedStaffData.staffname || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffname: e.target.value })}
          />
          <input
            type='email'
            required
            className='admin-staff-manager-form-input'
            placeholder='Email'
            value={selectedStaffData.staffemail || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffemail: e.target.value })}
          />
          <input
            type='password'
            required
            className='admin-staff-manager-form-input'
            placeholder='Password'
            value={selectedStaffData.staffpassword || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffpassword: e.target.value })}
          />
          <input
            type='tel'
            required
            maxLength='10'
            className='admin-staff-manager-form-input'
            placeholder='Phone'
            value={selectedStaffData.staffphone || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffphone: e.target.value })}
          />
          <select
            required
            className='admin-staff-manager-form-input'
            value={selectedStaffData.staffaccess || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffaccess: e.target.value })}
          >
            <option value='Super-Staff'>Super-Staff</option>
            <option value='HO-Staff'>HO-Staff</option>
            <option value='Staff'>Staff</option>
          </select>
          <input
            type='text'
            required
            className='admin-staff-manager-form-input'
            placeholder='ID Proof'
            value={selectedStaffData.staffidproof || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffidproof: e.target.value })}
          />
          <input
            type='text'
            required
            className='admin-staff-manager-form-input'
            placeholder='Office Branch'
            value={selectedStaffData.staffofficebranch || ''}
            onChange={(e) =>
              setSelectedStaffData({ ...selectedStaffData, staffofficebranch: e.target.value })
            }
          />
            {/*
          <br />
          <input type='checkbox' required className='admin-staff-manage-form-input-checkbox' />
          <label className='admin-staff-manage-form-input-checkbox-label'>
           I agree with Terms and Conditions & Privacy Policy
          </label>
          */}
          <br />
          <button type='submit' className='admin-staff-manager-form-button'>
            {selectedStaffId ? 'Update Staff' : 'Add Staff'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AdminStaffManage;
