import React, { useState, useEffect } from 'react';
import './AdminCompanyManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';

function AdminCompanyManage() {
  const [companies, setCompanies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const API = process.env.REACT_APP_API;
  const [selectedCompanyData, setSelectedCompanyData] = useState({
    companyname: '',
    companyregistrationtype: '',
    companypartytype: '',
    companygstno: '',
    companycontact: '',
    companystate: '',
    companyofficeaddress: '',
    companypincode: '',
  });

  const itemsPerPage = 10;
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
      .get(`${API}company`)
      .then((response) => {
        setCompanies(response.data);
        
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
        .put(`${API}company/${selectedCompanyId}`, selectedCompanyData)
        .then((response) => {
          // Handle successful update (if needed)
          console.log('Company updated successfully:', response.data);
          // Optionally, you can update the local state to reflect the changes
          setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
              company._id === selectedCompanyId ? response.data : company
            )
          );
          alert("Company Details are Updated Successfully");
        })
        .catch((error) => {
          console.error('Error updating company:', error);
        });
    } else {
      // Create a new company
      axios
        .post(`${API}company`, selectedCompanyData)
        .then((response) => {
          // Handle successful creation (if needed)
          console.log('Company created successfully:', response.data);
          // Optionally, you can update the local state to include the new company
          setCompanies((prevCompanies) => [...prevCompanies, response.data]);
          alert("Company Details are Saved Successfully");
        })
        .catch((error) => {
          console.error('Error creating company:', error);
        });
    }

    setSelectedCompanyData({
      companyname: '',
      companyregistrationtype: '',
      companypartytype: '',
      companygstno: '',
      companycontact: '',
      companystate: '',
      companyofficeaddress: '',
      companypincode: '',
    });

    setSelectedCompanyId(null);
  };

    //Delete a exsiting company

  const handleDeleteCompany = (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmDelete)
      axios
        .delete(`${API}company/${companyId}`)
        .then((response) => {
          console.log("Company deleted successfully");

          setCompanies((prevCompanies) =>
            prevCompanies.filter((company) => company._id !== companyId)
          );
        })
        .catch((error) => {
          console.error("Error deleting company:", error);
        });
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
    <div className='admin-company-manager'>
      <div className='admin-company-manager-data'>
        <h1 className='admin-company-manager-data-title'>ALL COMPANIES</h1>
        <input
              type='text'
              placeholder='Search Company...'
              className='admin-user-manage-form-input' // Search input placeholder
              value={searchInput} // Bind the input value to the state
              onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
            />
        <table className='admin-company-manager-data-table'>
          <thead className='admin-company-manager-data-table-head'>
            <tr className='admin-company-manager-data-table-row-head'>
              <th className='admin-company-manager-data-table-header '>Company Name</th>
              <th className='admin-company-manager-data-table-header'>GST No</th>
              <th className='admin-company-manager-data-table-header'>Contact</th>
              <th className='admin-company-manager-data-table-header'>Office Address</th>
              <th className='admin-company-manager-data-table-header'>Party Type</th>
              <th className='admin-company-manager-data-table-header'>Action</th>
            </tr>
          </thead>
          <tbody className='admin-company-manager-data-table-body'>
            {displayedCompaniesSearch.map((company) => (
              <tr key={company._id} className='admin-company-manager-data-table-row-body'>
                <td className='admin-company-manager-data-table-data highlight'>
                  {company.companyname.substring(0, 12)}
                </td>
                <td className='admin-company-manager-data-table-data'>
                  {company.companygstno.substring(0, 12)}
                </td>
                <td className='admin-company-manager-data-table-data'>
                  {company.companycontact}
                </td>
                <td className='admin-company-manager-data-table-data'>
                  {company.companyofficeaddress.substring(0, 12)}
                </td>
                <td className='admin-company-manager-data-table-data'>
                  {company.companypartytype.substring(0, 12)}
                </td>
                <td className='admin-company-manager-data-table-data'>
                  <button
                    className='admin-company-manager-data-table-button'
                    onClick={() => handleCompanyUpdate(company._id)}
                  >
                    Update
                  </button>
                                          <button
                      className="admin-company-manager-data-table-button"
                      onClick={() => {
                        handleDeleteCompany(company._id);
                      }}
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
      <div className='admin-company-manager-form'>
        <h1 className='admin-company-manager-form-title'>
          {selectedCompanyId ? 'UPDATE COMPANY' : 'ADD COMPANY'}
        </h1>
        <form className='admin-company-manager-form-form' onSubmit={handleFormSubmit}>
  <input
    type='text'
    required
    className='admin-company-manager-form-input-low'
    placeholder='Company Name'
    value={selectedCompanyData.companyname || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyname: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='admin-company-manager-form-input-low'
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
    className='admin-company-manager-form-input-low'
    placeholder='Contact'
    value={selectedCompanyData.companycontact || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companycontact: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='admin-company-manager-form-input-low'
    placeholder='Office Address'
    value={selectedCompanyData.companyofficeaddress || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyofficeaddress: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='admin-company-manager-form-input-low'
    placeholder='Company Registration Type'
    value={selectedCompanyData.companyregistrationtype || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyregistrationtype: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='admin-company-manager-form-input-low'
    placeholder='Party Type'
    value={selectedCompanyData.companypartytype || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companypartytype: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='admin-company-manager-form-input-low'
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
    className='admin-company-manager-form-input-low'
    placeholder='Pincode'
    value={selectedCompanyData.companypincode || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companypincode: e.target.value })
    }
  />
    {/*
<br />
          <input type='checkbox' required className='admin-company-manage-form-input-checkbox' />
          <label className='admin-company-manage-form-input-checkbox-label'>
           I you agree with Terms and Conditions & Privacy Policy
          </label>
          */}
          <br />
  <button type='submit' className='admin-company-manager-form-button'>
    {selectedCompanyId ? 'Update Company' : 'Add Company'}
  </button>
</form>

      </div> 
    </div>
    </div>

  );
}

export default AdminCompanyManage;
