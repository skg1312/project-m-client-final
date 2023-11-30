import React, { useState, useEffect } from 'react';
import './AdminBuyerManage.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import background from '../images/Desktop.png';
import AdminNavbar from './AdminNavbar';
import D from '../images/D.png';

function AdminBuyerManage() {
  const [buyers, setBuyers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);

  const [selectedBuyerData, setSelectedBuyerData] = useState({
    buyerid: '',
    buyercompanyname: '',
    buyercompanygstno: '',
    buyercompanyaddress: '',
    buyercompanystatename: '',
    buyercompanystatecode: '',
  });

  const [file, setFile] = useState(null);

  const API = process.env.REACT_APP_API;

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');

  const sortedBuyers = [...buyers].reverse();
  const displayedBuyerSearch = sortedBuyers
    .filter((item) => {
      const buyerCompanyName = item.buyercompanyname || '';

      if (buyerCompanyName.toLowerCase().includes(searchInput?.toLowerCase())) {
        return true;
      }

      return false;
    })
    .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const pageCount = Math.ceil(sortedBuyers.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}buyer`)
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
      axios
        .put(`${API}buyer/${selectedBuyerId}`, selectedBuyerData)
        .then((response) => {
          console.log('Buyer updated successfully:', response.data);
          setBuyers((prevBuyers) =>
            prevBuyers.map((buyer) => (buyer._id === selectedBuyerId ? response.data : buyer))
          );
        })
        .catch((error) => {
          console.error('Error updating buyer:', error);
        });
    } else {
      axios
        .post(`${API}buyer`, selectedBuyerData)
        .then((response) => {
          console.log('Buyer created successfully:', response.data);
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
  try {
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API}buyer/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('File uploaded successfully:', response.dat);
    alert("File is Uploaded Successfully");
     window.location.reload();
    
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
const handleBuyerDelete = (buyerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this buyer?');

    if (confirmDelete) {
      axios
        .delete(`${API}buyer/${buyerId}`)
        .then((response) => {
          console.log('Buyer deleted successfully:', response.data);
          setBuyers((prevBuyers) => prevBuyers.filter((buyer) => buyer._id !== buyerId));
        })
        .catch((error) => {
          console.error('Error deleting buyer:', error);
        });
    }
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
            className='admin-user-manage-form-input'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
              <div className='admin-buyer-manage-file-upload'>
          <h1>File Upload</h1>
          <input type='file' 
accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
          <table className='admin-buyer-manage-data-table'>
            <thead className='admin-buyer-manage-data-table-head'>
              <tr className='admin-buyer-manage-data-table-row-head'>
                <th className='admin-buyer-manage-data-table-header'>Company Name</th>
                <th className='admin-buyer-manage-data-table-header'>GST NO</th>
                <th className='admin-buyer-manage-data-table-header'>State Name</th>
                <th className='admin-buyer-manage-data-table-header'>State Code</th>
                <th className='admin-buyer-manage-data-table-header'>Action</th>
              </tr>
            </thead>
            <tbody className='admin-buyer-manage-data-table-body'>
              {displayedBuyerSearch.map((buyer) => (
                <tr key={buyer._id} className='admin-buyer-manage-data-table-row-body'>
                  <td className='admin-buyer-manage-data-table-data highlight'>
                    {buyer.buyercompanyname?.substring(0, 12) ?? 'N/A'}
                  </td>
                  <td className='admin-buyer-manage-data-table-data'>
                    {buyer.buyercompanygstno?.substring(0, 12) ?? 'N/A'}
                  </td>
                  <td className='admin-buyer-manage-data-table-data'>
                    {buyer.buyercompanystatename?.substring(0, 12) ?? 'N/A'}
                  </td>
                  <td className='admin-buyer-manage-data-table-data'>
                    {buyer.buyercompanystatecode?.substring(0, 12) ?? 'N/A'}
                  </td>
                  <td className='admin-buyer-manage-data-table-data'>
                    <button
                      className='admin-buyer-manage-data-table-button'
                      onClick={() => handleBuyerUpdate(buyer._id)}
                    >
                      Update
                    </button>
                        <button
                      onClick={() => handleBuyerDelete(buyer._id)}
                    >
                      <img className='admin-buyer-icon' src={D} alt='delete'/>
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
