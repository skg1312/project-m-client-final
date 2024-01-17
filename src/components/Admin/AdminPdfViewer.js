import React from 'react';
import { useParams } from 'react-router-dom';

//import printIcon from '../images/printer.png';
// import Download from '../images/download_icon.gif';

const AdminPdfViewer = () => {
	const { selectedInvoiceId } = useParams();
	const API = process.env.REACT_APP_API;
	const pdfUrl = `${API}download2/${selectedInvoiceId}`;
	// console.log('pdfUrl', pdfUrl);

	//const handlePrint = () => {
	//		window.print();
	//	};

	// const handleDownload = () => {
	// 	window.location = ${API}download/${selectedInvoiceId};
	// };

	return (
		<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
			<iframe
				id='pdfViewerIframe'
				title='PDF Viewer'
				src={`https://docs.google.com/viewer?url=${encodeURIComponent(
					pdfUrl
				)}&embedded=true`}
				style={{ width: '100%', height: '100%', border: 'none' }}
			/>
			{/*
			<div
				style={{
					position: 'absolute',
					bottom: '10px',
					right: '25px',
					zIndex: 999,
				}}
			>
				<img
					src={printIcon}
					alt='Print'
					style={{
						width: '70px',
						height: '70px',
						cursor: 'pointer',
					}}
					onClick={handlePrint}
				/>
				<img
					src={Download}
					alt='Download'
					style={{
						width: '60px',
						height: '60px',
						cursor: 'pointer',
					}}
					onClick={handleDownload}
				/> 
			</div>
*/}
		</div>
	);
};

export default AdminPdfViewer;
