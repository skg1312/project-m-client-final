import React, { useState, useEffect } from 'react';
import './CompanyManage.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function CompanyManage() {
  const [companies, setCompanies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
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
  const pagesVisited = pageNumber * itemsPerPage;

  // Sort the companies array in reverse order (newest first)
  const sortedCompanies = [...companies].reverse();
  const displayedCompanies = sortedCompanies.slice(pagesVisited, pagesVisited + itemsPerPage);

  const pageCount = Math.ceil(sortedCompanies.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/company')
      .then((response) => {
        setCompanies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);

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
        .put(`http://localhost:5000/company/${selectedCompanyId}`, selectedCompanyData)
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
        .post('http://localhost:5000/company', selectedCompanyData)
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
    <div className='company-manager'>
      <div className='company-manager-data'>
        <h1 className='company-manager-data-title'>ALL COMPANIES</h1>
        <table className='company-manager-data-table'>
          <thead className='company-manager-data-table-head'>
            <tr className='company-manager-data-table-row-head'>
              <th className='company-manager-data-table-header '>Company Name</th>
              <th className='company-manager-data-table-header'>GST No</th>
              <th className='company-manager-data-table-header'>Contact</th>
              <th className='company-manager-data-table-header'>Office Address</th>
              <th className='company-manager-data-table-header'>Party Type</th>
              <th className='company-manager-data-table-header'>Action</th>
            </tr>
          </thead>
          <tbody className='company-manager-data-table-body'>
            {displayedCompanies.map((company) => (
              <tr key={company._id} className='company-manager-data-table-row-body'>
                <td className='company-manager-data-table-data highlight'>
                  {company.companyname.substring(0, 12)}
                </td>
                <td className='company-manager-data-table-data'>
                  {company.companygstno.substring(0, 12)}
                </td>
                <td className='company-manager-data-table-data'>
                  {company.companycontact}
                </td>
                <td className='company-manager-data-table-data'>
                  {company.companyofficeaddress.substring(0, 12)}
                </td>
                <td className='company-manager-data-table-data'>
                  {company.companypartytype.substring(0, 12)}
                </td>
                <td className='company-manager-data-table-data'>
                  <button
                    className='company-manager-data-table-button'
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
      <div className='company-manager-form'>
        <h1 className='company-manager-form-title'>
          {selectedCompanyId ? 'UPDATE COMPANY' : 'ADD COMPANY'}
        </h1>
        <form className='company-manager-form-form' onSubmit={handleFormSubmit}>
  <input
    type='text'
    required
    className='company-manager-form-input-high'
    placeholder='Company Name'
    value={selectedCompanyData.companyname || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyname: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='company-manager-form-input-low'
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
    className='company-manager-form-input-low'
    placeholder='Contact'
    value={selectedCompanyData.companycontact || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companycontact: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='company-manager-form-input-low'
    placeholder='Office Address'
    value={selectedCompanyData.companyofficeaddress || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyofficeaddress: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='company-manager-form-input-low'
    placeholder='Company Registration Type'
    value={selectedCompanyData.companyregistrationtype || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companyregistrationtype: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='company-manager-form-input-low'
    placeholder='Party Type'
    value={selectedCompanyData.companypartytype || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companypartytype: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='company-manager-form-input-low'
    placeholder='Country'
    value={selectedCompanyData.companycountry || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companycountry: e.target.value })
    }
  />

  <input
    type='text'
    required
    className='company-manager-form-input-low'
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
    className='company-manager-form-input-low'
    placeholder='Pincode'
    value={selectedCompanyData.companypincode || ''}
    onChange={(e) =>
      setSelectedCompanyData({ ...selectedCompanyData, companypincode: e.target.value })
    }
  />
<br />
          <input type='checkbox' required className='company-manage-form-input-checkbox' />
          <label className='company-manage-form-input-checkbox-label'>
            By creating an account, you agree with Terms and Conditions & Privacy Policy
          </label>
  <button type='submit' className='company-manager-form-button'>
    {selectedCompanyId ? 'Update Company' : 'Add Company'}
  </button>
</form>

      </div> 
    </div>
  );
}

export default CompanyManage;
