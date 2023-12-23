import React, { useState, useEffect } from 'react';
import './AdminBuyerManage.css';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import background from '../images/Desktop.png';
import AdminNavbar from './AdminNavbar';
import E from '../images/E.png';
import D from '../images/D.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminBuyerManage() {
	const [buyers, setBuyers] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	const [selectedBuyerId, setSelectedBuyerId] = useState(null);

	// const [selectedBuyerData, setSelectedBuyerData] = useState({
	// 	buyerid: '',
	// 	buyercompanyname: '',
	// 	buyercompanygstno: '',
	// 	buyercompanyaddress: '',
	// 	buyercompanystatename: '',
	// 	buyercompanystatecode: '',
	// });

	const [file, setFile] = useState(null);
	const [states, setStates] = useState([]);

	const API = process.env.REACT_APP_API;

	// const itemsPerPage = 12;
	const stateOptions = [
		{ _id: 'default', statename: 'Select State', statecode: '----', __v: 0 },
		...states,
	];
	const [searchInput, setSearchInput] = useState('');

	const sortedBuyers = [...buyers].reverse();
	const displayedBuyerSearch = sortedBuyers.filter((item) => {
		const buyerCompanyName = item.buyercompanyname || '';

		if (buyerCompanyName.toLowerCase().includes(searchInput?.toLowerCase())) {
			return true;
		}

		return false;
	});
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedBuyers.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

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

	useEffect(() => {
		axios
			.get(`${API}state`)
			.then((response) => {
				setStates(response.data);
			})
			.catch((error) => {
				console.error('Error fetching state data:', error);
			});
	}, [API]);

	// Formik and Yup Validation
	const formik = useFormik({
		initialValues: {
			buyerid: '',
			buyercompanyname: '',
			buyercompanygstno: '',
			buyercompanyaddress: '',
			buyercompanystatename: '',
			buyercompanystatecode: '',
		},
		validationSchema: Yup.object({
			buyerid: Yup.string().required('Buyer ID is required'),
			buyercompanyname: Yup.string().required('Company Name is required'),
			buyercompanygstno: Yup.string().required('GST Number is required'),
			buyercompanyaddress: Yup.string().required('Company Address is required'),
			buyercompanystatename: Yup.string().required(
				'Company State Name is required'
			),
			buyercompanystatecode: Yup.string().required(
				'Company State Code is required'
			),
		}),
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const handleBuyerUpdate = (buyerUpdateId) => {
		setSelectedBuyerId(buyerUpdateId);
		const selectedBuyer = buyers.find((buyer) => buyer._id === buyerUpdateId);
		formik.setValues({ ...selectedBuyer });
	};

	const handleFormSubmit = (values) => {
		const selectedState = stateOptions.find(
			(option) => option.statename === values.companystate
		);
		if (selectedBuyerId) {
			axios
				.put(`${API}buyer/${selectedBuyerId}`, values)
				.then((response) => {
					setBuyers((prevBuyers) =>
						prevBuyers.map((buyer) =>
							buyer._id === selectedBuyerId ? response.data : buyer
						)
					);
					toast.success('Buyer Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating buyer:', error);
					toast.error('Error In Updating the Buyer');
				});
		} else {
			axios
				.post(`${API}buyer`, values)
				.then((response) => {
					setBuyers((prevBuyers) => [...prevBuyers, response.data]);
					toast.success('Buyer Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating buyer:', error);
					toast.error('Error creating buyer. Please try again.');
				});
		}

		formik.setValues({
			...values,
			companypincode: selectedState ? selectedState.statecode : '',
		});

		formik.resetForm();
		setSelectedBuyerId(null);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			toast.info(`Selected file: ${selectedFile.name}`);
		}

		setFile(selectedFile);
	};

	const handleFileUpload = async () => {
		try {
			if (!file) {
				toast.error('Please select a file before uploading.');
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post(`${API}buyer/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log('File uploaded successfully:', response.data);
			toast.success('File is Uploaded Successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error uploading file:', error);
			toast.error('Error uploading file. Please try again.');
		}
	};

	const handleBuyerDelete = (buyerId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this Buyer?'
		);

		if (confirmDelete) {
			axios
				.delete(`${API}buyer/${buyerId}`)
				.then((response) => {
					setBuyers((prevBuyers) =>
						prevBuyers.filter((buyer) => buyer._id !== buyerId)
					);
					toast.success('Buyer deleted successfully');
				})
				.catch((error) => {
					console.error('Error deleting buyer:', error);
					toast.error('Error deleting buyer. Please try again.');
				});
		}
	};

	const handleStateChange = (event) => {
		const selectedStateCode = stateOptions.find(
			(option) => option.statename === event.target.value
		)?.statecode;

		formik.setFieldValue('buyercompanystatename', event.target.value);
		formik.setFieldValue('buyercompanystatecode', selectedStateCode || '');

		formik.handleChange(event);
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
					<div className='admin-buyer-manage-data-header'>
						<h1 className='admin-buyer-manage-data-title'>ALL BUYERS</h1>
						<div className='admin-buyer-manage-file-upload'>
							<input
								className='admin-buyer-manage-file-upload-input'
								type='file'
								accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
								onChange={handleFileChange}
							/>
							<button
								className='admin-buyer-manage-file-upload-button'
								onClick={handleFileUpload}
							>
								Upload File
							</button>
						</div>
						{/* <div>Total Buyers: {buyers.length}</div> */}
					</div>
					<input
						type='text'
						placeholder='Search Buyer...'
						className='admin-user-manage-form-input'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<div className='table-scroll'>
						<table className='admin-buyer-manage-data-table'>
							<thead className='admin-buyer-manage-data-table-head'>
								<tr className='admin-buyer-manage-data-table-row-head'>
									<th className='admin-buyer-manage-data-table-header'>Sl</th>
									<th className='admin-buyer-manage-data-table-header'>
										Company Name
									</th>
									<th className='admin-buyer-manage-data-table-header'>
										GST NO
									</th>
									<th className='admin-buyer-manage-data-table-header'>
										State Name
									</th>
									<th className='admin-buyer-manage-data-table-header'>
										State Code
									</th>
									<th className='admin-buyer-manage-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-buyer-manage-data-table-body'>
								{displayedBuyerSearch.map((buyer, idx) => (
									<tr
										key={buyer._id}
										className='admin-buyer-manage-data-table-row-body'
									>
										<td className='admin-buyer-manage-data-table-data highlight'>
											{idx + 1}
										</td>
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
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleBuyerUpdate(buyer._id)}
											>
												<img
													src={E}
													alt='Update'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleBuyerDelete(buyer._id)}
											>
												<img
													src={D}
													alt='delete'
													style={{
														height: '15px',
														width: '15px',
														cursor: 'pointer',
													}}
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<br />
					{/* <ReactPaginate
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
					/> */}
					<br />
				</div>
				<div className='admin-buyer-manage-form'>
					<h1 className='admin-buyer-manage-form-title'>
						{selectedBuyerId ? 'UPDATE BUYER' : 'ADD BUYER'}
					</h1>
					<form
						className='admin-buyer-manage-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							required
							className='admin-buyer-manage-form-input'
							placeholder='Buyer ID'
							{...formik.getFieldProps('buyerid')}
						/>
						{formik.touched.buyerid && formik.errors.buyerid ? (
							<div className='error-message'>{formik.errors.buyerid}</div>
						) : null}

						<input
							type='text'
							required
							className='admin-buyer-manage-form-input'
							placeholder='Company Name'
							{...formik.getFieldProps('buyercompanyname')}
						/>
						{formik.touched.buyercompanyname &&
						formik.errors.buyercompanyname ? (
							<div className='error-message'>
								{formik.errors.buyercompanyname}
							</div>
						) : null}

						<input
							type='text'
							required
							className='admin-buyer-manage-form-input'
							placeholder='Company GST Number'
							{...formik.getFieldProps('buyercompanygstno')}
						/>
						{formik.touched.buyercompanygstno &&
						formik.errors.buyercompanygstno ? (
							<div className='error-message'>
								{formik.errors.buyercompanygstno}
							</div>
						) : null}

						<input
							type='text'
							required
							className='admin-buyer-manage-form-input'
							placeholder='Company Address'
							{...formik.getFieldProps('buyercompanyaddress')}
						/>
						{formik.touched.buyercompanyaddress &&
						formik.errors.buyercompanyaddress ? (
							<div className='error-message'>
								{formik.errors.buyercompanyaddress}
							</div>
						) : null}

						<select
							required
							className='admin-buyer-manage-form-input'
							value={formik.values.buyercompanystatename}
							onChange={handleStateChange}
							onBlur={formik.handleBlur}
							name='buyercompanystatename'
						>
							{stateOptions.map((option) => (
								<option key={option._id} value={option.statename}>
									{option.statename}
								</option>
							))}
						</select>
						{formik.touched.buyercompanystatename &&
						formik.errors.buyercompanystatename ? (
							<div className='error-message'>
								{formik.errors.buyercompanystatename}
							</div>
						) : null}

						<input
							type='text'
							pattern='[0-9]*'
							// required
							disabled
							maxLength='6'
							className='admin-buyer-manage-form-input'
							placeholder={`---${formik.values.buyercompanystatecode}---`}
							{...formik.getFieldProps('buyercompanystatecode')}
						/>
						{formik.touched.buyercompanystatecode &&
						formik.errors.buyercompanystatecode ? (
							<div className='error-message'>
								{formik.errors.buyercompanystatecode}
							</div>
						) : null}

						<br />
						<button type='submit' className='admin-buyer-manage-form-button'>
							{selectedBuyerId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={3000} />
		</div>
	);
}

export default AdminBuyerManage;
