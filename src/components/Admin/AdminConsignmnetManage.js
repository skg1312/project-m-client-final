import React, { useState, useEffect } from 'react';
import './AdminConsignmentManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import E from '../images/E.png';
import D from '../images/D.png';

function AdminConsignmentManage() {
	const [consignedItems, setConsignedItems] = useState([]);
	const [selectedConsignmentId, setSelectedConsignmentId] = useState(null);
	const API = process.env.REACT_APP_API;

	const [selectedConsignmentData, setSelectedConsignmentData] = useState({
		itemname: '',
		itemquantity: '',
		itemhsn: '',
		itemprice: '',
		itemtaxrate: '',
	});

	const [searchInput, setSearchInput] = useState(''); // State for search input
	const itemsPerPage = 12;
	const [pageNumber, setPageNumber] = useState(0);

	useEffect(() => {
		axios
			.get(`${API}consignment`)
			.then((response) => {
				setConsignedItems(response.data);
			})
			.catch((error) => {
				console.error('Error fetching consignment data:', error);
			});
	}, [API]);

	const sortedConsigned = [...consignedItems].reverse();
	const displayedConsignedSearch = sortedConsigned
		.filter((item) =>
			item.itemname.toLowerCase().includes(searchInput.toLowerCase())
		)
		.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	const pageCount = Math.ceil(consignedItems.length / itemsPerPage);

	const handleConsignmentUpdate = (consignmentUpdateId) => {
		setSelectedConsignmentId(consignmentUpdateId);
		const selectedConsignment = consignedItems.find(
			(consignment) => consignment._id === consignmentUpdateId
		);
		setSelectedConsignmentData({ ...selectedConsignment });
	};

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (selectedConsignmentId) {
			// Update an existing consignment
			axios
				.put(
					`${API}consignment/${selectedConsignmentId}`,
					selectedConsignmentData
				)
				.then((response) => {
					// Handle successful update (if needed)
					console.log('Consignment updated successfully:', response.data);
					// Optionally, you can update the local state to reflect the changes
					setConsignedItems((prevConsignedItems) =>
						prevConsignedItems.map((consignment) =>
							consignment._id === selectedConsignmentId
								? response.data
								: consignment
						)
					);
					alert('Consignment Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating consignment:', error);
				});
		} else {
			// Create a new consignment
			axios
				.post(`${API}consignment`, selectedConsignmentData)
				.then((response) => {
					// Handle successful creation (if needed)
					console.log('Consignment created successfully:', response.data);
					// Optionally, you can update the local state to include the new consignment
					setConsignedItems((prevConsignedItems) => [
						...prevConsignedItems,
						response.data,
					]);
					alert('Consignment Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating consignment:', error);
				});
		}

		setSelectedConsignmentData({
			itemname: '',
			itemquantity: '',
			itemhsn: '',
			itemprice: '',
			itemtaxrate: '',
		});

		setSelectedConsignmentId(null);
	};

	const handleDeleteConsignment = (consignmentId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this Consignment?'
		);
		if (confirmDelete) {
			axios
				.delete(`${API}consignment/${consignmentId}`)
				.then((response) => {
					setConsignedItems((prevConsignedItems) =>
						prevConsignedItems.filter(
							(consignment) => consignment._id !== consignmentId
						)
					);
					console.log('Consignment deleted successfully');
				})
				.catch((error) => {
					console.error('Error deleting consignment:', error);
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
			<div className='admin-consignment-manage'>
				<div className='admin-consignment-manage-data'>
					<h1 className='admin-consignment-manage-data-title'>
						ALL CONSIGNMENTS
					</h1>
					<input
						type='text'
						placeholder='Search Item Name...'
						className='admin-consignment-manage-form-input' // Search input placeholder
						value={searchInput} // Bind the input value to the state
						onChange={(e) => setSearchInput(e.target.value)} // Update the searchInput state as the user types
					/>
					<table className='admin-consignment-manage-data-table'>
						<thead className='admin-consignment-manage-data-table-head'>
							<tr className='admin-consignment-manage-data-table-row-head'>
								<th className='admin-consignment-manage-data-table-header'>
									Item Name
								</th>
								<th className='admin-consignment-manage-data-table-header'>
									Item Quantity
								</th>
								<th className='admin-consignment-manage-data-table-header'>
									Item HSN
								</th>
								<th className='admin-consignment-manage-data-table-header'>
									Item Price
								</th>
								<th className='admin-consignment-manage-data-table-header'>
									Item Tax Rate
								</th>
								<th className='admin-consignment-manage-data-table-header'>
									Action
								</th>
							</tr>
						</thead>
						<tbody className='admin-consignment-manage-data-table-body'>
							{displayedConsignedSearch.map((item) => (
								<tr
									key={item._id}
									className='admin-consignment-manage-data-table-row-body'
								>
									<td className='admin-consignment-manage-data-table-data highlight'>
										{item.itemname}
									</td>
									<td className='admin-consignment-manage-data-table-data'>
										{item.itemquantity}
									</td>
									<td className='admin-consignment-manage-data-table-data'>
										{item.itemhsn}
									</td>
									<td className='admin-consignment-manage-data-table-data'>
										{item.itemprice}
									</td>
									<td className='admin-consignment-manage-data-table-data'>
										{item.itemtaxrate}
									</td>
									<td className='admin-consignment-manage-data-table-data'>
										<button
											style={{
												background: 'none',
												border: 'none',
											}}
											onClick={() => handleConsignmentUpdate(item._id)}
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
												handleDeleteConsignment(item._id);
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
				<div className='admin-consignment-manage-form'>
					<h1 className='admin-consignment-manage-form-title'>
						{selectedConsignmentId ? 'UPDATE CONSIGNMENT' : 'ADD CONSIGNMENT'}
					</h1>
					<form
						className='admin-consignment-manage-form-form'
						onSubmit={handleFormSubmit}
					>
						<input
							type='text'
							required
							className='admin-consignment-manage-form-input'
							placeholder='Item Name'
							value={selectedConsignmentData.itemname || ''}
							onChange={(e) =>
								setSelectedConsignmentData({
									...selectedConsignmentData,
									itemname: e.target.value,
								})
							}
						/>
						<input
							type='number'
							required
							pattern='[0-9]*'
							className='admin-consignment-manage-form-input'
							placeholder='Item Quantity'
							value={selectedConsignmentData.itemquantity || ''}
							onChange={(e) =>
								setSelectedConsignmentData({
									...selectedConsignmentData,
									itemquantity: e.target.value,
								})
							}
						/>
						<input
							type='number'
							pattern='[0-9]*'
							required
							className='admin-consignment-manage-form-input'
							placeholder='Item HSN'
							value={selectedConsignmentData.itemhsn || ''}
							onChange={(e) =>
								setSelectedConsignmentData({
									...selectedConsignmentData,
									itemhsn: e.target.value,
								})
							}
						/>
						<input
							type='number'
							required
							pattern='[0-9]*'
							className='admin-consignment-manage-form-input'
							placeholder='Item Price'
							value={selectedConsignmentData.itemprice || ''}
							onChange={(e) =>
								setSelectedConsignmentData({
									...selectedConsignmentData,
									itemprice: e.target.value,
								})
							}
						/>
						<input
							type='number'
							pattern='[0-9]*'
							required
							className='admin-consignment-manage-form-input'
							placeholder='Item Tax Rate'
							value={selectedConsignmentData.itemtaxrate || ''}
							onChange={(e) =>
								setSelectedConsignmentData({
									...selectedConsignmentData,
									itemtaxrate: e.target.value,
								})
							}
						/>
						{/*
            <br />
          <input type='checkbox' required className='admin-consignment-manage-form-input-checkbox' />
          <label className='admin-consignment-manage-form-input-checkbox-label'>
            I you agree with Terms and Conditions & Privacy Policy
          </label>
          */}
						<br />
						<button
							type='submit'
							className='admin-consignment-manage-form-button'
						>
							{selectedConsignmentId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AdminConsignmentManage;
