import React, { useState, useEffect } from 'react';
import './AdminBuyerManage.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import background from '../images/Desktop.png';
import AdminNavbar from './AdminNavbar';

function AdminBuyerManage() {
  const [buyers, setBuyers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);

  const API = process.env.REACT_APP_API || 'https://octopus-app-2s9og.ondigitalocean.app';

  const [selectedBuyerData, setSelectedBuyerData] = useState({
    buyerid: '',
    buyercompanyname: '',
    buyercompanygstno: '',
    buyercompanyaddress: '',
    buyercompanystatename: '',
    buyercompanystatecode: '',
  });

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');

  // Sort the buyer array in reverse order (newest first)
  const sortedBuyers = [...buyers].reverse();
  const displayedBuyerSearch = sortedBuyers
  .filter(
    (item) =>
      item.buyercompanyname.toLowerCase().includes(searchInput.toLowerCase()))
  .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const pageCount = Math.ceil(sortedBuyers.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}/buyer`) // Use the appropriate API endpoint for buyers
      .then((response) => {
        setBuyers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching buyer data:', error);
      });
  }, [API]);

  const handleBuyerUpdate = (buyerUpdateId) => {
    setSelectedBuyerId(buyerUpdateId);
    const selectedBuyer = buyers.find((buyer) => buyer._id === buyerUpdateId);
    setSelectedBuyerData({ ...selectedBuyer });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedBuyerId) {
      // Update an existing buyer
      axios
        .put(`${API}buyer/${selectedBuyerId}`, selectedBuyerData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Buyer updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setBuyers((prevBuyers) =>
            prevBuyers.map((buyer) => (buyer._id === selectedBuyerId ? response.data : buyer))
          );
        })
        .catch((error) => {
          console.error('Error updating buyer:', error);
        });
    } else {
      // Create a new buyer
      axios
        .post(`${API}/buyer`, selectedBuyerData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Buyer created successfully:', response.data);
          // Optionally, you can update the local state to include the new buyer
          setBuyers((prevBuyers) => [...prevBuyers, response.data]);
        })
        .catch((error) => {
          console.error('Error creating buyer:', error);
        });
    }

    setSelectedBuyerData({
      buyerid: '',
      buyercompanyname: '',
      buyercompanygstno: '',
      buyercompanyaddress: '',
      buyercompanystatename: '',
      buyercompanystatecode: '',
    });

    setSelectedBuyerId(null);
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
    <div className='admin-buyer-manage'>
      <div className='admin-buyer-manage-data'>
        <h1 className='admin-buyer-manage-data-title'>ALL BUYERS</h1>
        <input
              type='text'
              placeholder='Search Buyer...'
              className='admin-user-manage-form-input' // Search input placeholder
              value={searchInput} // Bind the input value to the state
              onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
            />
        <table className='admin-buyer-manage-data-table'>
          <thead className='admin-buyer-manage-data-table-head'>
            <tr className='admin-buyer-manage-data-table-row-head'>
              <th className='admin-buyer-manage-data-table-header'>Buyer Id</th>
              <th className='admin-buyer-manage-data-table-header'>Company Name</th>
              <th className='admin-buyer-manage-data-table-header'>GST NO</th>
              <th className='admin-buyer-manage-data-table-header'>State Name</th>
              <th className='admin-buyer-manage-data-table-header'>Action</th>
            </tr>
          </thead>
          <tbody className='admin-buyer-manage-data-table-body'>
            {displayedBuyerSearch.map((buyer) => (
              <tr key={buyer._id} className='admin-buyer-manage-data-table-row-body'>
                <td className='admin-buyer-manage-data-table-data highlight'>{buyer.buyerid.substring(0, 12)}</td>
                <td className='admin-buyer-manage-data-table-data'>{buyer.buyercompanyname.substring(0, 12)}</td>
                <td className='admin-buyer-manage-data-table-data'>{buyer.buyercompanygstno.substring(0, 12)}</td>
                <td className='admin-buyer-manage-data-table-data'>{buyer.buyercompanystatename.substring(0, 12)}</td>
                <td className='admin-buyer-manage-data-table-data'>
                  <button
                    className='admin-buyer-manage-data-table-button'
                    onClick={() => handleBuyerUpdate(buyer._id)}
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
        <br />
      </div>
      <div className='admin-buyer-manage-form'>
        <h1 className='admin-buyer-manage-form-title'>{selectedBuyerId ? 'UPDATE BUYER' : 'ADD BUYER'}</h1>
        <form className='admin-buyer-manage-form-form' onSubmit={handleFormSubmit}>
          <input
            type='text'
            required
            className='admin-buyer-manage-form-input'
            placeholder='Buyer ID'
            value={selectedBuyerData.buyerid || ''}
            onChange={(e) => setSelectedBuyerData({ ...selectedBuyerData, buyerid: e.target.value })}
          />
          <input
            type='text'
            required
            className='admin-buyer-manage-form-input'
            placeholder='Company Name'
            value={selectedBuyerData.buyercompanyname || ''}
            onChange={(e) => setSelectedBuyerData({ ...selectedBuyerData, buyercompanyname: e.target.value })}
          />
          <input
            type='text'
            required
            className='admin-buyer-manage-form-input'
            placeholder='Company GST Number'
            value={selectedBuyerData.buyercompanygstno || ''}
            onChange={(e) => setSelectedBuyerData({ ...selectedBuyerData, buyercompanygstno: e.target.value })}
          />
          <input
            type='text'
            required
            className='admin-buyer-manage-form-input'
            placeholder='Company Address'
            value={selectedBuyerData.buyercompanyaddress || ''}
            onChange={(e) => setSelectedBuyerData({ ...selectedBuyerData, buyercompanyaddress: e.target.value })}
          />
          <input
            type='text'
            required
            className='admin-buyer-manage-form-input'
            placeholder='Company State Name'
            value={selectedBuyerData.buyercompanystatename || ''}
            onChange={(e) => setSelectedBuyerData({ ...selectedBuyerData, buyercompanystatename: e.target.value })}
          />
          <input
            type='text'
            required
            className='admin-buyer-manage-form-input'
            placeholder='Company State Code'
            value={selectedBuyerData.buyercompanystatecode || ''}
            onChange={(e) => setSelectedBuyerData({ ...selectedBuyerData, buyercompanystatecode: e.target.value })}
          />
          <br />
          <input type='checkbox' required className='buyer-manage-form-input-checkbox' />
          <label className='admin-buyer-manage-form-input-checkbox-label'>
            I you agree with Terms and Conditions & Privacy Policy
          </label>
          <br />
          <button type='submit' className='admin-buyer-manage-form-button'>
            {selectedBuyerId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>

    </div>
  );
}

export default AdminBuyerManage;
