import React, { useState, useEffect } from 'react';
import './AdminSellerManage.css';
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import background from '../images/Desktop.png';
import E from '../images/E.png';
import D from '../images/D.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminSellerManage() {
	const [sellers, setSellers] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	const [selectedSellerId, setSelectedSellerId] = useState(null);
	// const [selectedSellerData, setSelectedSellerData] = useState({
	// 	sellerid: '',
	// 	sellercompanyname: '',
	// 	sellercompanygstno: '',
	// 	sellercompanyaddress: '',
	// 	sellercompanystatename: '',
	// 	sellercompanystatecode: '',
	// });
	const [file, setFile] = useState(null);
	const API = process.env.REACT_APP_API;
	// const itemsPerPage = 12;
	const [searchInput, setSearchInput] = useState('');

	const sortedSellers = [...sellers].reverse();
	const displayedSellerSearch = sortedSellers.filter((item) => {
		const sellerCompanyName = item.sellercompanyname || '';

		if (sellerCompanyName.toLowerCase().includes(searchInput?.toLowerCase())) {
			return true;
		}

		return false;
	});
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedSellers.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

	useEffect(() => {
		axios
			.get(`${API}seller`)
			.then((response) => {
				setSellers(response.data);
			})
			.catch((error) => {
				console.error('Error fetching seller data:', error);
			});
	}, [API]);

	// Formik and Yup Validation
	const formik = useFormik({
		initialValues: {
			sellerid: '',
			sellercompanyname: '',
			sellercompanygstno: '',
			sellercompanyaddress: '',
			sellercompanystatename: '',
			sellercompanystatecode: '',
		},
		validationSchema: Yup.object({
			sellerid: Yup.string().required('Agent ID is required'),
			sellercompanyname: Yup.string().required('Company Name is required'),
			sellercompanygstno: Yup.string().required('GST Number is required'),
			sellercompanyaddress: Yup.string().required(
				'Company Address is required'
			),
			sellercompanystatename: Yup.string().required(
				'Company State Name is required'
			),
			sellercompanystatecode: Yup.string().required(
				'Company State Code is required'
			),
		}),
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const handleSellerUpdate = (sellerUpdateId) => {
		setSelectedSellerId(sellerUpdateId);
		const selectedSeller = sellers.find(
			(seller) => seller._id === sellerUpdateId
		);
		formik.setValues({ ...selectedSeller });
	};

	const handleFormSubmit = (values) => {
		if (selectedSellerId) {
			axios
				.put(`${API}seller/${selectedSellerId}`, values)
				.then((response) => {
					setSellers((prevSellers) =>
						prevSellers.map((seller) =>
							seller._id === selectedSellerId ? response.data : seller
						)
					);
					toast.success('Agent Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating seller:', error);
					toast.error('Error In Updating the Agent');
				});
		} else {
			axios
				.post(`${API}seller`, values)
				.then((response) => {
					setSellers((prevSellers) => [...prevSellers, response.data]);
					toast.success('Agent Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating seller:', error);
					toast.error('Error creating seller. Please try again.');
				});
		}

		formik.resetForm();
		setSelectedSellerId(null);
	};

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleFileUpload = async () => {
		try {
			if (!file) {
				toast.error('Please select a file before uploading.');
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post(`${API}seller/upload`, formData, {
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

	const handleSellerDelete = (sellerId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this Seller?'
		);

		if (confirmDelete) {
			axios
				.delete(`${API}seller/${sellerId}`)
				.then((response) => {
					setSellers((prevSellers) =>
						prevSellers.filter((seller) => seller._id !== sellerId)
					);
					toast.success('Seller deleted successfully');
				})
				.catch((error) => {
					console.error('Error deleting seller:', error);
					toast.error('Error deleting seller. Please try again.');
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

			<div className='admin-seller-manage'>
				<div className='admin-seller-manage-data'>
					<div className='admin-seller-manage-data-header'>
						<h1 className='admin-seller-manage-data-title'>ALL AGENTS</h1>
						<div className='admin-seller-manage-file-upload'>
							<input
								className='admin-seller-manage-file-upload-input'
								type='file'
								accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
								onChange={handleFileChange}
							/>
							<button
								className='admin-seller-manage-file-upload-button'
								onClick={handleFileUpload}
							>
								Upload File
							</button>
						</div>
					</div>
					<input
						type='text'
						placeholder='Search Agents...'
						className='admin-user-manage-form-input'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<div className='table-scroll'>
						<table className='admin-seller-manage-data-table'>
							<thead className='admin-seller-manage-data-table-head'>
								<tr className='admin-seller-manage-data-table-row-head'>
									<th className='admin-seller-manage-data-table-header'>
										Agents Id
									</th>
									<th className='admin-seller-manage-data-table-header'>
										Company Name
									</th>
									<th className='admin-seller-manage-data-table-header'>
										GST NO
									</th>
									<th className='admin-seller-manage-data-table-header'>
										State Name
									</th>
									<th className='admin-seller-manage-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-seller-manage-data-table-body'>
								{displayedSellerSearch.map((seller) => (
									<tr
										key={seller._id}
										className='admin-seller-manage-data-table-row-body'
									>
										<td className='admin-seller-manage-data-table-data highlight'>
											{seller.sellerid?.substring(0, 12) ?? 'N/A'}
										</td>
										<td className='admin-seller-manage-data-table-data'>
											{seller.sellercompanyname?.substring(0, 18) ?? 'N/A'}
										</td>
										<td className='admin-seller-manage-data-table-data'>
											{seller.sellercompanygstno?.substring(0, 12) ?? 'N/A'}
										</td>
										<td className='admin-seller-manage-data-table-data'>
											{seller.sellercompanystatename?.substring(0, 12) ?? 'N/A'}
										</td>
										<td className='admin-seller-manage-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleSellerUpdate(seller._id)}
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
												onClick={() => handleSellerDelete(seller._id)}
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
				</div>
				<div className='admin-seller-manage-form'>
					<h1 className='admin-seller-manage-form-title'>
						{selectedSellerId ? 'UPDATE AGENT' : 'ADD AGENT'}
					</h1>
					<form
						className='admin-seller-manage-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							required
							className='admin-seller-manage-form-input'
							placeholder='Agent ID'
							{...formik.getFieldProps('sellerid')}
						/>
						{formik.touched.sellerid && formik.errors.sellerid ? (
							<div className='error-message'>{formik.errors.sellerid}</div>
						) : null}

						<input
							type='text'
							required
							className='admin-seller-manage-form-input'
							placeholder='Company Name'
							{...formik.getFieldProps('sellercompanyname')}
						/>
						{formik.touched.sellercompanyname &&
						formik.errors.sellercompanyname ? (
							<div className='error-message'>
								{formik.errors.sellercompanyname}
							</div>
						) : null}

						<input
							type='text'
							required
							className='admin-seller-manage-form-input'
							placeholder='Company GST Number'
							{...formik.getFieldProps('sellercompanygstno')}
						/>
						{formik.touched.sellercompanygstno &&
						formik.errors.sellercompanygstno ? (
							<div className='error-message'>
								{formik.errors.sellercompanygstno}
							</div>
						) : null}

						<input
							type='text'
							required
							className='admin-seller-manage-form-input'
							placeholder='Company Address'
							{...formik.getFieldProps('sellercompanyaddress')}
						/>
						{formik.touched.sellercompanyaddress &&
						formik.errors.sellercompanyaddress ? (
							<div className='error-message'>
								{formik.errors.sellercompanyaddress}
							</div>
						) : null}

						<select
							required
							className='admin-seller-manage-form-input'
							value={formik.values.sellercompanystatename}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name='sellercompanystatename'
						>
							<option value='' disabled>
								Select State
							</option>
							<option value='Jammu and Kashmir - JK'>
								Jammu and Kashmir (JK)
							</option>
							<option value='Himachal Pradesh - HP'>
								Himachal Pradesh (HP)
							</option>
							<option value='Punjab - PB'>Punjab (PB)</option>
							<option value='Chandigarh - CH'>Chandigarh (CH)</option>
							<option value='Uttarakhand - UK'>Uttarakhand (UK)</option>
							<option value='Haryana - HR'>Haryana (HR)</option>
							<option value='Delhi - DL'>Delhi (DL)</option>
							<option value='Rajasthan - RJ'>Rajasthan (RJ)</option>
							<option value='Uttar Pradesh - UP'>Uttar Pradesh (UP)</option>
							<option value='Bihar - BR'>Bihar (BR)</option>
							<option value='Sikkim - SK'>Sikkim (SK)</option>
							<option value='Arunachal Pradesh - AR'>
								Arunachal Pradesh (AR)
							</option>
							<option value='Nagaland - NL'>Nagaland (NL)</option>
							<option value='Manipur - MN'>Manipur (MN)</option>
							<option value='Mizoram - MZ'>Mizoram (MZ)</option>
							<option value='Tripura - TR'>Tripura (TR)</option>
							<option value='Meghalaya - ML'>Meghalaya (ML)</option>
							<option value='Assam - AS'>Assam (AS)</option>
							<option value='West Bengal - WB'>West Bengal (WB)</option>
							<option value='Jharkhand - JH'>Jharkhand (JH)</option>
							<option value='Odisha - OD'>Odisha (OD)</option>
							<option value='Chattisgarh - CG'>Chattisgarh (CG)</option>
							<option value='Madhya Pradesh - MP'>Madhya Pradesh (MP)</option>
							<option value='Gujarat - GJ'>Gujarat (GJ)</option>
							<option value='Dadra & Nagar Haveli and Daman & Diu - DNHDD'>
								Dadra & Nagar Haveli and Daman & Diu (DNHDD)
							</option>
							<option value='Maharashtra - MH'>Maharashtra (MH)</option>
							<option value='Karnataka - KA'>Karnataka (KA)</option>
							<option value='Goa - GA'>Goa (GA)</option>
							<option value='Lakshadweep Islands - LD'>
								Lakshadweep Islands (LD)
							</option>
							<option value='Kerala - KL'>Kerala (KL)</option>
							<option value='Tamil Nadu - TN'>Tamil Nadu (TN)</option>
							<option value='Pondicherry - PY'>Pondicherry (PY)</option>
							<option value='Andaman and Nicobar Islands - AN'>
								Andaman and Nicobar Islands (AN)
							</option>
							<option value='Telangana - TS'>Telangana (TS)</option>
							<option value='Andhra Pradesh - AD'>Andhra Pradesh (AD)</option>
							<option value='Ladakh - LA'>Ladakh (LA)</option>
							<option value='Other Territory - OT'>Other Territory (OT)</option>
						</select>
						{formik.touched.sellercompanystatename &&
						formik.errors.sellercompanystatename ? (
							<div className='error-message'>
								{formik.errors.sellercompanystatename}
							</div>
						) : null}

						<input
							type='text'
							required
							className='admin-seller-manage-form-input'
							placeholder='Company State Code'
							{...formik.getFieldProps('sellercompanystatecode')}
						/>
						{formik.touched.sellercompanystatecode &&
						formik.errors.sellercompanystatecode ? (
							<div className='error-message'>
								{formik.errors.sellercompanystatecode}
							</div>
						) : null}

						<br />
						<button type='submit' className='admin-seller-manage-form-button'>
							{selectedSellerId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={3000} />
		</div>
	);
}

export default AdminSellerManage;
