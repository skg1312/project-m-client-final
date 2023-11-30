import React, { useState, useEffect } from 'react';
import './AdminVechicleManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';

function AdminLoadingManage() {
  const [loadings, setLoadings] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedLoadingId, setSelectedLoadingId] = useState(null);
  const API = process.env.REACT_APP_API;
  const [selectedLoadingData, setSelectedLoadingData] = useState({
    startpoint: '',
    endpoint: '',
    rate: '',
  });

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');

  // Sort the loading array in reverse order (newest first)
  const sortedLoadings = [...loadings].reverse();
  const displayedLoadingsSearch = sortedLoadings
    .filter(
      (item) =>
        item.startpoint.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.endpoint.toLowerCase().includes(searchInput.toLowerCase())
    )
    .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const pageCount = Math.ceil(sortedLoadings.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}load`)
      .then((response) => {
        setLoadings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching loading data:', error);
      });
  }, [API]);

  const handleLoadingUpdate = (loadingUpdateId) => {
    setSelectedLoadingId(loadingUpdateId);
    const selectedLoading = loadings.find((loading) => loading._id === loadingUpdateId);
    setSelectedLoadingData({ ...selectedLoading });
  };

  const handleLoadingDelete = (loadingDeleteId) => {
    axios
      .delete(`${API}load/${loadingDeleteId}`)
      .then(() => {
        // Handle successful deletion (if needed)
        console.log('Loading deleted successfully');
        // Optionally, you can update the local state to reflect the changes
        setLoadings((prevLoadings) => prevLoadings.filter((loading) => loading._id !== loadingDeleteId));
      })
      .catch((error) => {
        console.error('Error deleting loading:', error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedLoadingId) {
      // Update an existing loading
      axios
        .put(`${API}load/${selectedLoadingId}`, selectedLoadingData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Loading updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setLoadings((prevLoadings) =>
            prevLoadings.map((loading) =>
              loading._id === selectedLoadingId ? response.data : loading
            )
          );
        })
        .catch((error) => {
          console.error('Error updating loading:', error);
        });
    } else {
      // Create a new loading
      axios
        .post(`${API}load`, selectedLoadingData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Loading created successfully:', response.data);
          // Optionally, you can update the local state to include the new loading
          setLoadings((prevLoadings) => [...prevLoadings, response.data]);
        })
        .catch((error) => {
          console.error('Error creating loading:', error);
        });
    }

    setSelectedLoadingData({
      startpoint: '',
      endpoint: '',
      rate: '',
    });

    setSelectedLoadingId(null);
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
      <div className='admin-loading-manage'>
        <div className='admin-loading-manage-data'>
          <h1 className='admin-loading-manage-data-title'>ALL LOADINGS</h1>
          <input
            type='text'
            placeholder='Search Loading...'
            className='admin-loading-manage-form-input'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <table className='admin-loading-manage-data-table'>
            <thead className='admin-loading-manage-data-table-head'>
              <tr className='admin-loading-manage-data-table-row-head'>
                <th className='admin-loading-manage-data-table-header'>Start Point</th>
                <th className='admin-loading-manage-data-table-header'>End Point</th>
                <th className='admin-loading-manage-data-table-header'>Rate</th>
                <th className='admin-loading-manage-data-table-header'>Action</th>
              </tr>
            </thead>
            <tbody className='admin-loading-manage-data-table-body'>
              {displayedLoadingsSearch.map((loading) => (
                <tr key={loading._id} className='admin-loading-manage-data-table-row-body'>
                  <td className='admin-loading-manage-data-table-data'>{loading.startpoint}</td>
                  <td className='admin-loading-manage-data-table-data'>{loading.endpoint}</td>
                  <td className='admin-loading-manage-data-table-data'>{loading.rate}</td>
                  <td className='admin-loading-manage-data-table-data'>
                    <button
                      className='admin-loading-manage-data-table-button'
                      onClick={() => handleLoadingUpdate(loading._id)}
                    >
                      Update
                    </button>
                    <button
                      className='admin-loading-manage-data-table-button'
                      onClick={() => handleLoadingDelete(loading._id)}
                    >
                      Delete
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
        <div className='admin-loading-manage-form'>
          <h1 className='admin-loading-manage-form-title'>
            {selectedLoadingId ? 'UPDATE LOADING' : 'ADD LOADING'}
          </h1>
          <form className='admin-loading-manage-form-form' onSubmit={handleFormSubmit}>
            <input
              type='text'
              className='admin-loading-manage-form-input-high'
              placeholder='Start Point'
required
              value={selectedLoadingData.startpoint}
              onChange={(e) =>
                setSelectedLoadingData({ ...selectedLoadingData, startpoint: e.target.value })
              }
            />
            <input
              type='text'
              className='admin-loading-manage-form-input-high'
              placeholder='End Point'
required
              value={selectedLoadingData.endpoint}
              onChange={(e) =>
                setSelectedLoadingData({ ...selectedLoadingData, endpoint: e.target.value })
              }
            />
            <input
              type='number'
              className='admin-loading-manage-form-input-high'
              placeholder='Rate'
required
              value={selectedLoadingData.rate}
              onChange={(e) =>
                setSelectedLoadingData({ ...selectedLoadingData, rate: e.target.value })
              }
            />
             <br />
            <input type='checkbox' className='admin-vechicle-manage-form-input-checkbox' />
            <label className='admin-vechicle-manage-form-input-checkbox-label'>
              I you agree with Terms and Conditions & Privacy Policy
            </label>
            <br />
            <button type='submit' className='admin-loading-manage-form-button'>
              {selectedLoadingId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoadingManage;
