import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInvoiceManager.css';
import background from '../images/Desktop.png';
import ReactPaginate from 'react-paginate';
import AdminNavbar from './AdminNavbar';

function AdminInvoiceManagement() {
    const [invoice, setInvoice] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const API = process.env.REACT_APP_API;
    const itemsPerPage = 10;

    const sortedInvoice = [...invoice].reverse();
    const displayedInvoiceSearch = sortedInvoice
        .filter(
            (item) =>
                item.invoicedetails.invoiceno.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.companydetails.companyname.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.vehicledetails.vehiclenumber.toLowerCase().includes(searchInput.toLowerCase()) 
        )
        .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

    const pageCount = Math.ceil(sortedInvoice.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const ViewInvoice = () => {
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
                                        <td className='invoice-management-data-body-table-data'>{invoice.invoicedetails.invoiceno}</td>
                                        <td className='invoice-management-data-body-table-data'>{invoice.companydetails.companyname}</td>
                                        <td className='invoice-management-data-body-table-data'>
  {invoice.invoicedetails.invoicedate ?
    new Date(invoice.invoicedetails.invoicedate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) : 'N/A'}
</td>

                                        <td className='invoice-management-data-body-table-data'>{invoice.vehicledetails.vehiclenumber}</td>
                                        <td className='invoice-management-data-body-table-data'>{invoice.boardingdetails.totalcost}</td>
                                        <td className='invoice-management-data-body-table-data'>
                                            <button onClick={() => setSelectedInvoiceId(invoice._id)} className='invoice-management-data-body-table-data-button'>View</button>
                                            <button onClick={ViewInvoice} className='invoice-management-data-body-table-data-button'>Print</button>
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