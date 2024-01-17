import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePdf } from 'react-pdf-js';

const PdfViewer = () => {
	const { selectedInvoiceId, timestamp } = useParams();
	const API = process.env.REACT_APP_API;
	const pdfUrl = `${API}download/${selectedInvoiceId}`;
	const [isUrlValid, setIsUrlValid] = useState(true);
	const [showPrintSaveOptions, setShowPrintSaveOptions] = useState(true);

	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(null);
	const canvasEl = useRef(null);

	useEffect(() => {
		const checkUrlValidity = () => {
			const currentTimestamp = Date.now();
			const urlExpirationTime = parseInt(timestamp, 10);

			// Check if the URL is still valid
			if (currentTimestamp > urlExpirationTime) {
				setIsUrlValid(false);
			}
		};

		checkUrlValidity();
	}, [timestamp]);

	const [loading, numPages] = usePdf({
		file: pdfUrl,
		onDocumentComplete: ({ numPages }) => setPages(numPages),
		page,
		canvasEl,
	});

	useEffect(() => {
		const checkUrlValidity = async () => {
			try {
				const response = await fetch(pdfUrl);
				if (!response.ok) {
					setIsUrlValid(false);
				}
			} catch (error) {
				setIsUrlValid(false);
			}
		};

		checkUrlValidity();
	}, [pdfUrl]);

	if (!isUrlValid) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					flexDirection: 'column',
				}}
			>
				Sorry, the PDF link has expired or is invalid.
			</div>
		);
	}

	const handlePrint = () => {
		window.print();
		setShowPrintSaveOptions(false);
	};

	const handleSave = () => {
		setShowPrintSaveOptions(false);
	};

	const renderPagination = (page, pages) => {
		// Your pagination logic here
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				flexDirection: 'column',
			}}
		>
			{showPrintSaveOptions && (
				<div style={{ marginBottom: '20px' }}>
					<button style={{ marginRight: '10px' }} onClick={handlePrint}>
						Print
					</button>
					<button onClick={handleSave}>Save</button>
				</div>
			)}
			{loading && <span>Loading...</span>}
			<div style={{ display: 'inline-block' }}>
				<canvas ref={canvasEl} />
			</div>
			{renderPagination(page, pages)}
		</div>
	);
};

export default PdfViewer;
