import React, { useState, useEffect } from 'react';
import './AdminCompanyManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import E from '../images/E.png';
import D from '../images/D.png';

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
		.filter((item) =>
			item.companyname.toLowerCase().includes(searchInput.toLowerCase())
		)
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
		const selectedCompany = companies.find(
			(company) => company._id === companyUpdateId
		);
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
					alert('Company Details are Updated Successfully');
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
					alert('Company Details are Saved Successfully');
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
			'Are you sure you want to delete this company?'
		);
		if (confirmDelete)
			axios
				.delete(`${API}company/${companyId}`)
				.then((response) => {
					console.log('Company deleted successfully');

					setCompanies((prevCompanies) =>
						prevCompanies.filter((company) => company._id !== companyId)
					);
				})
				.catch((error) => {
					console.error('Error deleting company:', error);
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
								<th className='admin-company-manager-data-table-header '>
									Company Name
								</th>
								<th className='admin-company-manager-data-table-header'>
									GST No
								</th>
								<th className='admin-company-manager-data-table-header'>
									Contact
								</th>
								<th className='admin-company-manager-data-table-header'>
									Office Address
								</th>
								{/*<th className='admin-company-manager-data-table-header'>Party Type</th> */}
								<th className='admin-company-manager-data-table-header'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='admin-company-manager-data-table-body'>
							{displayedCompaniesSearch.map((company) => (
								<tr
									key={company._id}
									className='admin-company-manager-data-table-row-body'
								>
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
									{/*                
<td className='admin-company-manager-data-table-data'>
                  {company.companypartytype.substring(0, 12)}
                </td>
*/}
									<td className='admin-company-manager-data-table-data'>
										<button
											style={{
												background: 'none',
												border: 'none',
											}}
											onClick={() => handleCompanyUpdate(company._id)}
										>
											<img
												src={E}
												alt='Update'
												style={{
													height: '18px',
													width: '18px',
													cursor: 'pointer',
												}}
											/>
										</button>
										<button
											style={{
												background: 'none',
												border: 'none',
											}}
											onClick={() => {
												handleDeleteCompany(company._id);
											}}
										>
											<img
												src={D}
												alt='delete'
												style={{
													height: '18px',
													width: '18px',
													cursor: 'pointer',
												}}
											/>
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
					<form
						className='admin-company-manager-form-form'
						onSubmit={handleFormSubmit}
					>
						<input
							type='text'
							required
							className='admin-company-manager-form-input-high'
							placeholder='Company Name'
							value={selectedCompanyData.companyname || ''}
							onChange={(e) =>
								setSelectedCompanyData({
									...selectedCompanyData,
									companyname: e.target.value,
								})
							}
						/>

						<input
							type='text'
							required
							className='admin-company-manager-form-input-high'
							placeholder='GST No'
							value={selectedCompanyData.companygstno || ''}
							onChange={(e) =>
								setSelectedCompanyData({
									...selectedCompanyData,
									companygstno: e.target.value,
								})
							}
						/>

						<input
							type='tel'
							required
							maxLength='10'
							className='admin-company-manager-form-input-high'
							placeholder='Contact'
							value={selectedCompanyData.companycontact || ''}
							onChange={(e) =>
								setSelectedCompanyData({
									...selectedCompanyData,
									companycontact: e.target.value,
								})
							}
						/>

						<input
							type='text'
							required
							className='admin-company-manager-form-input-high'
							placeholder='Office Address'
							value={selectedCompanyData.companyofficeaddress || ''}
							onChange={(e) =>
								setSelectedCompanyData({
									...selectedCompanyData,
									companyofficeaddress: e.target.value,
								})
							}
						/>
						{/*
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
*/}
<select
  required
  className='admin-company-manager-form-input-high'
  value={selectedCompanyData.companystate || ''}
  onChange={(e) =>
    setSelectedCompanyData({
      ...selectedCompanyData,
      companystate: e.target.value,
    })
  }
>
  <option value="" disabled>Select State</option>
  <option value="Jammu and Kashmir - JK">Jammu and Kashmir (JK)</option>
  <option value="Himachal Pradesh - HP">Himachal Pradesh (HP)</option>
  <option value="Punjab - PB">Punjab (PB)</option>
  <option value="Chandigarh - CH">Chandigarh (CH)</option>
  <option value="Uttarakhand - UK">Uttarakhand (UK)</option>
  <option value="Haryana - HR">Haryana (HR)</option>
  <option value="Delhi - DL">Delhi (DL)</option>
  <option value="Rajasthan - RJ">Rajasthan (RJ)</option>
  <option value="Uttar Pradesh - UP">Uttar Pradesh (UP)</option>
  <option value="Bihar - BR">Bihar (BR)</option>
  <option value="Sikkim - SK">Sikkim (SK)</option>
  <option value="Arunachal Pradesh - AR">Arunachal Pradesh (AR)</option>
  <option value="Nagaland - NL">Nagaland (NL)</option>
  <option value="Manipur - MN">Manipur (MN)</option>
  <option value="Mizoram - MZ">Mizoram (MZ)</option>
  <option value="Tripura - TR">Tripura (TR)</option>
  <option value="Meghalaya - ML">Meghalaya (ML)</option>
  <option value="Assam - AS">Assam (AS)</option>
  <option value="West Bengal - WB">West Bengal (WB)</option>
  <option value="Jharkhand - JH">Jharkhand (JH)</option>
  <option value="Odisha - OD">Odisha (OD)</option>
  <option value="Chattisgarh - CG">Chattisgarh (CG)</option>
  <option value="Madhya Pradesh - MP">Madhya Pradesh (MP)</option>
  <option value="Gujarat - GJ">Gujarat (GJ)</option>
  <option value="Dadra & Nagar Haveli and Daman & Diu - DNHDD">Dadra & Nagar Haveli and Daman & Diu (DNHDD)</option>
  <option value="Maharashtra - MH">Maharashtra (MH)</option>
  <option value="Karnataka - KA">Karnataka (KA)</option>
  <option value="Goa - GA">Goa (GA)</option>
  <option value="Lakshadweep Islands - LD">Lakshadweep Islands (LD)</option>
  <option value="Kerala - KL">Kerala (KL)</option>
  <option value="Tamil Nadu - TN">Tamil Nadu (TN)</option>
  <option value="Pondicherry - PY">Pondicherry (PY)</option>
  <option value="Andaman and Nicobar Islands - AN">Andaman and Nicobar Islands (AN)</option>
  <option value="Telangana - TS">Telangana (TS)</option>
  <option value="Andhra Pradesh - AD">Andhra Pradesh (AD)</option>
  <option value="Ladakh - LA">Ladakh (LA)</option>
  <option value="Other Territory - OT">Other Territory (OT)</option>
</select>


						<input
							type='number'
							pattern='[0-9]*'
							required
							maxLength='6'
							className='admin-company-manager-form-input-high'
							placeholder='Pincode'
							value={selectedCompanyData.companypincode || ''}
							onChange={(e) =>
								setSelectedCompanyData({
									...selectedCompanyData,
									companypincode: e.target.value,
								})
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
