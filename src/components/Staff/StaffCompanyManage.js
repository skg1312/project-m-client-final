import React, { useState, useEffect } from 'react';
import './StaffCompanyManage.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import background from '../images/Desktop.png';
import StaffNavbar from './StaffNavbar';

function StaffCompanyManage() {
  const [companies, setCompanies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const API = process.env.REACT_APP_API || 'https://octopus-app-2s9og.ondigitalocean.app';
  const [selectedCompanyData, setSelectedCompanyData] = useState({
    companyid: '',
    companyname: '',
    companyregistrationtype: '',
    companypartytype: '',
    companygstno: '',
    companycontact: '',
    companycountry: '',
    companystate: '',
    companyofficeaddress: '',
    companypincode: '',
  });

  const itemsPerPage = 12;
  const [searchInput, setSearchInput] = useState('');

  // Sort the companies array in reverse order (newest first)
  const sortedCompanies = [...companies].reverse();
  const displayedCompaniesSearch = sortedCompanies
  .filter(
    (item) =>
      item.companyname.toLowerCase().includes(searchInput.toLowerCase()))
  .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const pageCount = Math.ceil(sortedCompanies.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}/company`)
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, [API]);

  const handleCompanyUpdate = (companyUpdateId) => {
    setSelectedCompanyId(companyUpdateId);
    const selectedCompany = companies.find((company) => company._id === companyUpdateId);
    setSelectedCompanyData({ ...selectedCompany });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedCompanyId) {
      // Update an existing company
      axios
        .put(`${API}/company/${selectedCompanyId}`, selectedCompanyData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Company updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
              company._id === selectedCompanyId ? response.data : company
            )
          );
        })
        .catch((error) => {
          console.error('Error updating company:', error);
        });
    } else {
      // Create a new company
      axios
        .post(`${API}/company`, selectedCompanyData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Company created successfully:', response.data);
          // Optionally, you can update the local state to include the new company
          setCompanies((prevCompanies) => [...prevCompanies, response.data]);
        })
        .catch((error) => {
          console.error('Error creating company:', error);
        });
    }

    setSelectedCompanyData({
      companyid: '',
      companyname: '',
      companyregistrationtype: '',
      companypartytype: '',
      companygstno: '',
      companycontact: '',
      companycountry: '',
      companystate: '',
      companyofficeaddress: '',
      companypincode: '',
    });

    setSelectedCompanyId(null);
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
      <StaffNavbar />
    <div className='staff-company-manager'>
      <div className='staff-company-manager-data'>
        <h1 className='staff-company-manager-data-title'>ALL COMPANIES</h1>
        <input
              type='text'
              placeholder='Search Company...'
              className='admin-user-manage-form-input' // Search input placeholder
              value={searchInput} // Bind the input value to the state
              onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
            />
        <table className='staff-company-manager-data-table'>
          <thead className='staff-company-manager-data-table-head'>
            <tr className='staff-company-manager-data-table-row-head'>
              <th className='staff-company-manager-data-table-header '>Company Name</th>
              <th className='staff-company-manager-data-table-header'>GST No</th>
              <th className='staff-company-manager-data-table-header'>Contact</th>
              <th className='staff-company-manager-data-table-header'>Office Address</th>
              <th className='staff-company-manager-data-table-header'>Party Type</th>
              <th className='staff-company-manager-data-table-header'>Action</th>
            </tr>
          </thead>
          <tbody className='staff-company-manager-data-table-body'>
            {displayedCompaniesSearch.map((company) => (
              <tr key={company._id} className='staff-company-manager-data-table-row-body'>
                <td className='staff-company-manager-data-table-data highlight'>
                  {company.companyname.substring(0, 12)}
                </td>
                <td className='staff-company-manager-data-table-data'>
                  {company.companygstno.substring(0, 12)}
                </td>
                <td className='staff-company-manager-data-table-data'>
                  {company.companycontact}
                </td>
                <td className='staff-company-manager-data-table-data'>
                  {company.companyofficeaddress.substring(0, 12)}
                </td>
                <td className='staff-company-manager-data-table-data'>
                  {company.companypartytype.substring(0, 12)}
                </td>
                <td className='staff-company-manager-data-table-data'>
                  <button
                    className='staff-company-manager-data-table-button'
                    onClick={() => handleCompanyUpdate(company._id)}
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
      <div className='staff-company-manager-form'>
        <h1 className='staff-company-manager-form-title'>
          {selectedCompanyId ? 'UPDATE COMPANY' : 'ADD COMPANY'}
        </h1>
        <form className='staff-company-manager-form-form' onSubmit={handleFormSubmit}>
  <input
    type='text'
    required
    className='staff-company-manager-form-input-high'
    placeholder='Company Name'
    value={selectedCompanyData.companyname || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyname: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='staff-company-manager-form-input-low'
    placeholder='GST No'
    value={selectedCompanyData.companygstno || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companygstno: e.target.value })
    }
  />

  <input
    type='tel'
    required
    maxLength='10'
    className='staff-company-manager-form-input-low'
    placeholder='Contact'
    value={selectedCompanyData.companycontact || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companycontact: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='staff-company-manager-form-input-low'
    placeholder='Office Address'
    value={selectedCompanyData.companyofficeaddress || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyofficeaddress: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='staff-company-manager-form-input-low'
    placeholder='Company Registration Type'
    value={selectedCompanyData.companyregistrationtype || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyregistrationtype: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='staff-company-manager-form-input-low'
    placeholder='Party Type'
    value={selectedCompanyData.companypartytype || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companypartytype: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='staff-company-manager-form-input-low'
    placeholder='Country'
    value={selectedCompanyData.companycountry || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companycountry: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='staff-company-manager-form-input-low'
    placeholder='State'
    value={selectedCompanyData.companystate || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companystate: e.target.value })
    }
  />

  <input
    type='number'
    pattern='[0-9]*'
    required
    maxLength='6'
    className='staff-company-manager-form-input-low'
    placeholder='Pincode'
    value={selectedCompanyData.companypincode || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companypincode: e.target.value })
    }
  />
<br />
          <input type='checkbox' required className='staff-company-manage-form-input-checkbox' />
          <label className='staff-company-manage-form-input-checkbox-label'>
            I agree with Terms and Conditions & Privacy Policy
          </label>
          <br />
  <button type='submit' className='staff-company-manager-form-button'>
    {selectedCompanyId ? 'Update Company' : 'Add Company'}
  </button>
</form>
      </div> 
    </div>
    </div>
  );
}

export default StaffCompanyManage;
