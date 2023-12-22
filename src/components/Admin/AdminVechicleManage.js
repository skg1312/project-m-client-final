import React, { useState, useEffect } from 'react';
import './AdminVechicleManage.css';
import axios from 'axios';
import background from '../images/Desktop.png';
// import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import E from '../images/E.png';
import D from '../images/D.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLoadingManage() {
	const [loadings, setLoadings] = useState([]);
	// const [pageNumber, setPageNumber] = useState(0);
	const [selectedLoadingId, setSelectedLoadingId] = useState(null);
	const API = process.env.REACT_APP_API;

	const validationSchema = Yup.object().shape({
		startpoint: Yup.string().required('Start Point is required'),
		endpoint: Yup.string().required('End Point is required'),
		rate: Yup.number()
			.required('Rate is required')
			.positive('Rate must be positive'),
	});

	const formik = useFormik({
		initialValues: {
			startpoint: '',
			endpoint: '',
			rate: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	// const itemsPerPage = 12;
	const [searchInput, setSearchInput] = useState('');

	const sortedLoadings = [...loadings].reverse();
	const displayedLoadingsSearch = sortedLoadings.filter(
		(item) =>
			item.startpoint.toLowerCase().includes(searchInput.toLowerCase()) ||
			item.endpoint.toLowerCase().includes(searchInput.toLowerCase())
	);
	// 	.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

	// const pageCount = Math.ceil(sortedLoadings.length / itemsPerPage);

	// const changePage = ({ selected }) => {
	// 	setPageNumber(selected);
	// };

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
		const selectedLoading = loadings.find(
			(loading) => loading._id === loadingUpdateId
		);
		setSelectedLoadingId(loadingUpdateId);
		formik.setValues({
			startpoint: selectedLoading.startpoint,
			endpoint: selectedLoading.endpoint,
			rate: selectedLoading.rate,
		});
	};

	const handleLoadingDelete = (loadingDeleteId) => {
		const isConfirmed = window.confirm(
			'Are you sure you want to delete this loading?'
		);

		if (isConfirmed) {
			axios
				.delete(`${API}load/${loadingDeleteId}`)
				.then(() => {
					console.log('Loading deleted successfully');
					setLoadings((prevLoadings) =>
						prevLoadings.filter((loading) => loading._id !== loadingDeleteId)
					);
					toast.success('Loading Deleted Successfully');
				})
				.catch((error) => {
					console.error('Error deleting loading:', error);
					toast.error('Error deleting loading. Please try again.');
				});
		}
	};

	const handleFormSubmit = (formData) => {
		if (selectedLoadingId) {
			axios
				.put(`${API}load/${selectedLoadingId}`, formData)
				.then((response) => {
					setLoadings((prevLoadings) =>
						prevLoadings.map((loading) =>
							loading._id === selectedLoadingId ? response.data : loading
						)
					);
					toast.success('Loading Details are Updated Successfully');
				})
				.catch((error) => {
					console.error('Error updating loading:', error);
					toast.error('Error updating loading. Please try again.');
				});
		} else {
			axios
				.post(`${API}load`, formData)
				.then((response) => {
					setLoadings((prevLoadings) => [...prevLoadings, response.data]);
					toast.success('Loading Details are Saved Successfully');
				})
				.catch((error) => {
					console.error('Error creating loading:', error);
					toast.error('Error creating loading. Please try again.');
				});
		}

		formik.resetForm();
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
						className='admin-user-manage-form-input'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<div className='table-scroll'>
						<table className='admin-loading-manage-data-table'>
							<thead className='admin-loading-manage-data-table-head'>
								<tr className='admin-loading-manage-data-table-row-head'>
									<th className='admin-loading-manage-data-table-header'>Sl</th>
									<th className='admin-loading-manage-data-table-header'>
										Start Point
									</th>
									<th className='admin-loading-manage-data-table-header'>
										End Point
									</th>
									<th className='admin-loading-manage-data-table-header'>
										Rate
									</th>
									<th className='admin-loading-manage-data-table-header'>
										Action
									</th>
								</tr>
							</thead>
							<tbody className='admin-loading-manage-data-table-body'>
								{displayedLoadingsSearch.map((loading, idx) => (
									<tr
										key={loading._id}
										className='admin-loading-manage-data-table-row-body'
									>
										<td className='admin-loading-manage-data-table-data'>
											{idx + 1}
										</td>
										<td className='admin-loading-manage-data-table-data'>
											{loading.startpoint}
										</td>
										<td className='admin-loading-manage-data-table-data'>
											{loading.endpoint}
										</td>
										<td className='admin-loading-manage-data-table-data'>
											{loading.rate}
										</td>
										<td className='admin-loading-manage-data-table-data'>
											<button
												style={{
													background: 'none',
													border: 'none',
												}}
												onClick={() => handleLoadingUpdate(loading._id)}
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
												onClick={() => handleLoadingDelete(loading._id)}
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
				<div className='admin-loading-manage-form'>
					<h1 className='admin-loading-manage-form-title'>
						{selectedLoadingId ? 'UPDATE LOADING' : 'ADD LOADING'}
					</h1>
					<form
						className='admin-loading-manage-form-form'
						onSubmit={formik.handleSubmit}
					>
						<input
							type='text'
							className='admin-loading-manage-form-input-high'
							placeholder='Start Point'
							required
							name='startpoint'
							value={formik.values.startpoint}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.startpoint && formik.errors.startpoint && (
							<div className='error-message'>{formik.errors.startpoint}</div>
						)}
						<input
							type='text'
							className='admin-loading-manage-form-input-high'
							placeholder='End Point'
							required
							name='endpoint'
							value={formik.values.endpoint}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.endpoint && formik.errors.endpoint && (
							<div className='error-message'>{formik.errors.endpoint}</div>
						)}
						<input
							type='number'
							className='admin-loading-manage-form-input-high'
							placeholder='Rate'
							required
							name='rate'
							value={formik.values.rate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.rate && formik.errors.rate && (
							<div className='error-message'>{formik.errors.rate}</div>
						)}
						<br />
						<button
							type='submit'
							className='admin-loading-manage-form-button'
							disabled={formik.isSubmitting || !formik.isValid}
						>
							{selectedLoadingId ? 'Update' : 'Add'}
						</button>
					</form>
				</div>
			</div>
			<ToastContainer position='top-right' autoClose={3000} />
		</div>
	);
}

export default AdminLoadingManage;
