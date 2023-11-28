import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInvoiceManager.css';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';
import PdfViewer from './AdminInvoiceView';

function AdminInvoiceManagement() {
    const [invoice, setInvoice] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const API = process.env.REACT_APP_API;
    const itemsPerPage = 10;

    const sortedInvoice = [...invoice].reverse();
    const displayedInvoiceSearch = sortedInvoice
  .filter((item) => {
    const invoiceNo = item.invoicedetails.invoiceno || '';
    const companyName = item.companydetails.companyname || '';
    const vehicleNumber = item.vehicledetails.vehiclenumber || '';

    // Check if the search criteria is null or cannot be converted to lowercase
    if (
      (invoiceNo && invoiceNo.toLowerCase().includes(searchInput?.toLowerCase())) ||
      (companyName && companyName.toLowerCase().includes(searchInput?.toLowerCase())) ||
      (vehicleNumber && vehicleNumber.toLowerCase().includes(searchInput?.toLowerCase()))
    ) {
      return true;
    }

    return false;
  })
  .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  
    const pageCount = Math.ceil(sortedInvoice.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const ViewInvoice = (invoiceid) => {
        setSelectedInvoiceId(invoiceid);
        if (selectedInvoiceId) {
            const pdfUrl = `${API}download/${selectedInvoiceId}`;

    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>PDF Viewer</title></head><body><div id="pdf-viewer-container"></div></body></html>');

    const iframeCode = `
      <div style="width: 100%; height: ;">
        <iframe
          title="PDF Viewer"
          src="https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true"
          style="width: 100%; height: 100%; border: none;"
        />
      </div>
    `;

    newWindow.document.write(iframeCode);
        }
    };
    const PrintInvoice = (invoiceid) => {
        setSelectedInvoiceId(invoiceid);
        if (selectedInvoiceId) {
            window.location = `${API}download/${selectedInvoiceId}`;
        }
    };


    useEffect(() => {
        axios
            .get(`${API}invoice`)
            .then((response) => {
                setInvoice(response.data);
            })
            .catch((error) => {
                console.error('Error fetching Invoice data:', error);
            });
    }, [API]);

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
          <AdminNavbar/>
            <div className='invoice-management'>
                <div className='invoice-management-data'>
                    <div className='invoice-management-data-header'>
                        All Invoice
                        
                        <input
                            type='text'
                            placeholder='Search Invoice...'
                            className='invoice-manage-search-input'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <div className='invoice-management-data-body'>
                        <table className='invoice-management-data-body-table'>
                            <thead className='invoice-management-data-body-table-row-head'>
                                <tr className='invoice-management-data-body-table-row'>
                                    <th className='invoice-management-data-body-table-header'>Invoice No</th>
                                    <th className='invoice-management-data-body-table-header'>Company Name</th>
                                    <th className='invoice-management-data-body-table-header'>Invoice Date</th>
                                    <th className='invoice-management-data-body-table-header'>Vehicle Number</th>
                                    <th className='invoice-management-data-body-table-header'>Total Cost</th>
                                    <th className='invoice-management-data-body-table-header'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='invoice-management-data-body-table-row-body'>
                                {displayedInvoiceSearch.map((invoice) => (
                                    <tr key={invoice._id} className='invoice-management-data-body-table-row'>
                                        <td className='invoice-management-data-body-table-data'>{invoice.invoicedetails.invoiceno?.substring(0, 12) ?? 'N/A'}
</td>
                                        <td className='invoice-management-data-body-table-data'>{invoice.companydetails.companyname?.substring(0,12) ?? 'N/A'}</td>
                                        <td className='invoice-management-data-body-table-data'>
  {invoice.invoicedetails.invoicedate ?
    new Date(invoice.invoicedetails.invoicedate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) : 'N/A'}
</td>

                                        <td className='invoice-management-data-body-table-data'>{invoice.vehicledetails.vehiclenumber?.substring(0,12) ?? 'N/A'}</td>
                                        <td className='invoice-management-data-body-table-data'>{invoice.boardingdetails.totalcost?.substring(0,12) ?? 'N/A'}</td>
                                        <td className='invoice-management-data-body-table-data'>
                                            <button onClick={() => ViewInvoice(invoice._id)}  className='invoice-management-data-body-table-data-button'>View</button>
                                            <button onClick={() => PrintInvoice(invoice._id)} className='invoice-management-data-body-table-data-button'>Print</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                       
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
                </div>
            </div>
        </div>
    );
}

export default AdminInvoiceManagement;
