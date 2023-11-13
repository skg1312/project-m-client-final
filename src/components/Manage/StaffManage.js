import React, { useState, useEffect } from 'react';
import './StaffManage.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function StaffManage() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
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
  const pagesVisited = pageNumber * itemsPerPage;

  // Sort the staff members array in reverse order (newest first)
  const sortedStaffMembers = [...staffMembers].reverse();
  const displayedStaffMembers = sortedStaffMembers.slice(pagesVisited, pagesVisited + itemsPerPage);

  const pageCount = Math.ceil(sortedStaffMembers.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/staff')
      .then((response) => {
        setStaffMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff member data:', error);
      });
  }, []);

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
        .put(`http://localhost:5000/staff/${selectedStaffId}`, selectedStaffData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Staff member updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setStaffMembers((prevStaffMembers) =>
            prevStaffMembers.map((staff) => (staff._id === selectedStaffId ? response.data : staff))
          );
        })
        .catch((error) => {
          console.error('Error updating staff member:', error);
        });
    } else {
      // Create a new staff member
      axios
        .post('http://localhost:5000/staff', selectedStaffData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Staff member created successfully:', response.data);
          // Optionally, you can update the local state to include the new staff member
          setStaffMembers((prevStaffMembers) => [...prevStaffMembers, response.data]);
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
    <div className='staff-manager'>
      <div className='staff-manager-data'>
        <h1 className='staff-manager-data-title'>ALL STAFF MEMBERS</h1>
        <table className='staff-manager-data-table'>
          <thead className='staff-manager-data-table-head'>
            <tr className='staff-manager-data-table-row-head'>
              <th className='staff-manager-data-table-header'>Staff Name</th>
              <th className='staff-manager-data-table-header'>Email</th>
              <th className='staff-manager-data-table-header'>Phone</th>
              <th className='staff-manager-data-table-header'>Office Branch</th>
              <th className='staff-manager-data-table-header'>Access</th>
              <th className='staff-manager-data-table-header'>Action</th>
            </tr>
          </thead>
          <tbody className='staff-manager-data-table-body'>
            {displayedStaffMembers.map((staff) => (
              <tr key={staff._id} className='staff-manager-data-table-row-body'>
                <td className='staff-manager-data-table-data highlight'>{staff.staffname.substring(0, 12)}</td>
                <td className='staff-manager-data-table-data'>{staff.staffemail.substring(0, 12)}</td>
                <td className='staff-manager-data-table-data'>{staff.staffphone}</td>
                <td className='staff-manager-data-table-data'>
                  {staff.staffofficebranch.substring(0, 12)}
                </td>
                <td className='staff-manager-data-table-data'>
                  {staff.staffaccess.substring(0, 12)}
                </td>
                <td className='staff-manager-data-table-data'>
                  <button
                    className='staff-manager-data-table-button'
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
      <div className='staff-manager-form'>
        <h1 className='staff-manager-form-title'>{selectedStaffId ? 'UPDATE STAFF' : 'ADD STAFF'}</h1>
        <form className='staff-manager-form-form' onSubmit={handleFormSubmit}>
          <input
            type='text'
            required
            className='staff-manager-form-input'
            placeholder='Staff Name'
            value={selectedStaffData.staffname || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffname: e.target.value })}
          />
          <input
            type='email'
            required
            className='staff-manager-form-input'
            placeholder='Email'
            value={selectedStaffData.staffemail || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffemail: e.target.value })}
          />
          <input
            type='password'
            required
            className='staff-manager-form-input'
            placeholder='Password'
            value={selectedStaffData.staffpassword || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffpassword: e.target.value })}
          />
          <input
            type='tel'
            required
            maxLength='10'
            className='staff-manager-form-input'
            placeholder='Phone'
            value={selectedStaffData.staffphone || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffphone: e.target.value })}
          />
          <select
            required
            className='staff-manager-form-input'
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
            className='staff-manager-form-input'
            placeholder='ID Proof'
            value={selectedStaffData.staffidproof || ''}
            onChange={(e) => setSelectedStaffData({ ...selectedStaffData, staffidproof: e.target.value })}
          />
          <input
            type='text'
            required
            className='staff-manager-form-input'
            placeholder='Office Branch'
            value={selectedStaffData.staffofficebranch || ''}
            onChange={(e) =>
              setSelectedStaffData({ ...selectedStaffData, staffofficebranch: e.target.value })
            }
          />
          <br />
          <input type='checkbox' required className='staff-manage-form-input-checkbox' />
          <label className='staff-manage-form-input-checkbox-label'>
            By creating an account, you agree with Terms and Conditions & Privacy Policy
          </label>
          <button type='submit' className='staff-manager-form-button'>
            {selectedStaffId ? 'Update Staff' : 'Add Staff'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffManage;
