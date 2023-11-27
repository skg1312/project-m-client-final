import React, { useState, useEffect } from 'react';
import './UserVechicleManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import UserNavbar from './UserNavbar';

function UserVechicleManage() {
  const [vechicle, setVechicle] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedVechicleId, setSelectedVechicleId] = useState(null);
  const API = process.env.REACT_APP_API;
  const [selectedVechicleData, setSelectedVechicleData] = useState({
    vechicleid: '',
    drivername: '',
    drivernumber: '',
    driveraddress: '',
    driveridproof: '',
    driverlicenseno: '',
    vechiclenuumber: '',
    vechiclemodel: '',
    vechicleofficebranch: '',
  });

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');
  
  // Sort the vechicle array in reverse order (newest first)
  const sortedVechicle = [...vechicle].reverse();
  const displayedVechicleSearch = sortedVechicle
  .filter(
    (item) =>
      item.vechiclenuumber.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.drivername.toLowerCase().includes(searchInput.toLowerCase())
      )
      .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);
  
  const pageCount = Math.ceil(sortedVechicle.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}vechicle`)
      .then((response) => {
        setVechicle(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vechicle data:', error);
      });
  }, [API]);

  const handleVechicleUpdate = (vechicleupdateid) => {
    setSelectedVechicleId(vechicleupdateid);
    const selectedVechicle = vechicle.find((v) => v._id === vechicleupdateid);
    setSelectedVechicleData({ ...selectedVechicle });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedVechicleId) {
      // Update an existing vehicle
      axios
        .put(`${API}vechicle/${selectedVechicleId}`, selectedVechicleData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Vehicle updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setVechicle((prevVechicle) =>
            prevVechicle.map((v) => (v._id === selectedVechicleId ? response.data : v))
          );
        })
        .catch((error) => {
          console.error('Error updating vechicle:', error);
        });
    } else {
      // Create a new vehicle
      axios
        .post(`${API}vechicle`, selectedVechicleData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Vehicle created successfully:', response.data);
          // Optionally, you can update the local state to include the new vehicle
          setVechicle((prevVechicle) => [...prevVechicle, response.data]);
        })
        .catch((error) => {
          console.error('Error creating vechicle:', error);
        });
    }

    setSelectedVechicleData({
      vechicleid: '',
      drivername: '',
      drivernumber: '',
      driveraddress: '',
      driveridproof: '',
      driverlicenseno: '',
      vechiclenuumber: '',
      vechiclemodel: '',
      vechicleofficebranch: '',
    });

    setSelectedVechicleId(null);
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
      <UserNavbar />
      <div className='user-vechicle-manage'>
        <div className='user-vechicle-manage-data'>
          <h1 className='user-vechicle-manage-data-title'>ALL VEHICLES</h1>
          <input
              type='text'
              placeholder='Search Vechicle...'
              className='admin-user-manage-form-input' // Search input placeholder
              value={searchInput} // Bind the input value to the state
              onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
            />
          <table className='user-vechicle-manage-data-table'>
            <thead className='user-vechicle-manage-data-table-head'>
              <tr className='user-vechicle-manage-data-table-row-head'>
                <th className='user-vechicle-manage-data-table-header'>Driver Name</th>
                <th className='user-vechicle-manage-data-table-header'>Vehicle Number</th>
                <th className='user-vechicle-manage-data-table-header'>Vehicle Model</th>
                <th className='user-vechicle-manage-data-table-header'>Driver Number</th>
                <th className='user-vechicle-manage-data-table-header'>Action</th>
              </tr>
            </thead>
            <tbody className='user-vechicle-manage-data-table-body'>
              {displayedVechicleSearch.map((vechicle) => (
                <tr key={vechicle._id} className='user-vechicle-manage-data-table-row-body'>
                  <td className='user-vechicle-manage-data-table-data'>{vechicle.drivername.substring(0, 12)}</td>
                  <td className='user-vechicle-manage-data-table-data highlight'>{vechicle.vechiclenuumber.substring(0, 12)}</td>
                  <td className='user-vechicle-manage-data-table-data'>{vechicle.vechiclemodel.substring(0, 12)}</td>
                  <td className='user-vechicle-manage-data-table-data'>{vechicle.drivernumber}</td>
                  <td className='user-vechicle-manage-data-table-data'>
                    <button className='user-vechicle-manage-data-table-button' onClick={() => handleVechicleUpdate(vechicle._id)}>update</button>
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
        <div className='user-vechicle-manage-form'>
          <h1 className='user-vechicle-manage-form-title'>
            {selectedVechicleId ? 'UPDATE VEHICLE' : 'ADD VEHICLE'}
          </h1>
          <form className='user-vechicle-manage-form-form' onSubmit={handleFormSubmit}>
            <input
              type='text'
              className='user-vechicle-manage-form-input-high'
              placeholder='Vehicle Id'
              value={selectedVechicleData.vechicleid || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, vechicleid: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-high'
              placeholder='Driver Name'
              value={selectedVechicleData.drivername || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, drivername: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-low'
              placeholder='Driver Number'
              value={selectedVechicleData.drivernumber || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, drivernumber: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-low'
              placeholder='Driver Address'
              value={selectedVechicleData.driveraddress || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, driveraddress: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-low'
              placeholder='Driver Id Proof'
              value={selectedVechicleData.driveridproof || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, driveridproof: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-low'
              placeholder='Driver License'
              value={selectedVechicleData.driverlicenseno || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, driverlicenseno: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-low'
              placeholder='Vehicle Number'
              value={selectedVechicleData.vechiclenuumber || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, vechiclenuumber: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-low'
              placeholder='Vehicle Model'
              value={selectedVechicleData.vechiclemodel || ''}
              onChange={(e) =>
                setSelectedVechicleData({ ...selectedVechicleData, vechiclemodel: e.target.value })
              }
            />
            <input
              type='text'
              className='user-vechicle-manage-form-input-high'
              placeholder='Office Branch'
              value={selectedVechicleData.vechicleofficebranch || ''}
              onChange={(e) =>
                setSelectedVechicleData({
                  ...selectedVechicleData,
                  vechicleofficebranch: e.target.value,
                })
              }
            />
            <br />
            <input type='checkbox' className='user-vechicle-manage-form-input-checkbox' />
            <label className='user-vechicle-manage-form-input-checkbox-label'>
              I agree with Terms and Conditions & Privacy Policy
            </label>
            <br />
            <button type='submit' className='user-vechicle-manage-form-button'>
              {selectedVechicleId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserVechicleManage;
