import React, { useState, useEffect } from 'react';
import axios from 'axios';
import A from '../images/A.png';
import D from '../images/D.png';
import E from '../images/E.png';
import './AdminCreateInvoice.css';
import background from '../images/Desktop.png';

const AdminCreateInvoice = () => {
  const [companies, setCompanies] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [consignments, setConsignments] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/company')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));

    axios.get('http://localhost:5000/seller')
      .then(response => setSellers(response.data))
      .catch(error => console.error('Error fetching sellers:', error));

    axios.get('http://localhost:5000/buyer')
      .then(response => setBuyers(response.data))
      .catch(error => console.error('Error fetching buyers:', error));

    axios.get('http://localhost:5000/vehicle')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));

    axios.get('http://localhost:5000/consignment')
      .then(response => setConsignments(response.data))
      .catch(error => console.error('Error fetching consignments:', error));
  }, []);

  const handleSelectChange = (e, setFunction) => {
    setFunction(e.target.value);
  };

  const handleSubmit = () => {
    const dataToSend = {
      companydetails: {
        companyid: selectedCompany,
        companyname: document.getElementById('companyName').value,
        companyregistrationtype: document.getElementById('companyRegistrationType').value,
        companypartytype: document.getElementById('companyPartyType').value,
        companygstno: document.getElementById('companyGSTNo').value,
        companycontact: document.getElementById('companyContact').value,
        companycountry: document.getElementById('companyCountry').value,
        companystate: document.getElementById('companyState').value,
        companyofficeaddress: document.getElementById('companyOfficeAddress').value,
        companypincode: document.getElementById('companyPincode').value,
      },
      sellerdetails: {
        sellerid: selectedSeller,
        sellercompanyname: document.getElementById('sellerCompanyName').value,
        sellercompanygstno: document.getElementById('sellerCompanyGSTNo').value,
        sellercompanyaddress: document.getElementById('sellerCompanyAddress').value,
        sellercompanystatename: document.getElementById('sellerCompanyStateName').value,
        sellercompanystatecode: document.getElementById('sellerCompanyStateCode').value,
      },
      buyerdetails: {
        buyerid: selectedBuyer,
        buyercompanyname: document.getElementById('buyerCompanyName').value,
        buyercompanygstno: document.getElementById('buyerCompanyGSTNo').value,
        buyercompanyaddress: document.getElementById('buyerCompanyAddress').value,
        buyercompanystatename: document.getElementById('buyerCompanyStateName').value,
        buyercompanystatecode: document.getElementById('buyerCompanyStateCode').value,
      },
      vehicledetails: {
        vehicleid: selectedVehicle,
        drivername: document.getElementById('driverName').value,
        drivernumber: document.getElementById('driverNumber').value,
        driveraddress: document.getElementById('driverAddress').value,
        driveridproof: document.getElementById('driverIdProof').value,
        driverlicenseno: document.getElementById('driverLicenseNo').value,
        vehiclenumber: document.getElementById('vehicleNumber').value,
        vehiclemodel: document.getElementById('vehicleModel').value,
        vehicleofficebranch: document.getElementById('vehicleOfficeBranch').value,
      },
      consignmentdetails: {
        itemdetails: consignments.map((consignment) => ({
          itemname: consignment.itemname,
          itemquantity: consignment.itemquantity,
          itemhsn: consignment.itemhsn,
          itemprice: consignment.itemprice,
          itemtaxrate: consignment.itemtaxrate,
        })),
      },
      invoicedetails: {
        invoiceno: document.getElementById('invoiceNo').value,
        invoicedate: document.getElementById('invoiceDate').value,
        ewaybillno: document.getElementById('ewayBillNo').value,
        deliverynote: document.getElementById('deliveryNote').value,
        supplierref: document.getElementById('supplierRef').value,
        otherref: document.getElementById('otherRef').value,
        buyersorder: document.getElementById('buyersOrder').value,
        ordereddate: document.getElementById('orderedDate').value,
        dispatchdocumentno: document.getElementById('dispatchDocumentNo').value,
        deliverynotedate: document.getElementById('deliveryNoteDate').value,
        dispatchthrough: document.getElementById('dispatchThrough').value,
        destination: document.getElementById('destination').value,
        termsandcondition: document.getElementById('termsAndConditions').value,
      },
      boardingdetails: {
        weight: document.getElementById('weightOfLoad').value,
        transportationcost: document.getElementById('transportationCost').value,
        totalcost: document.getElementById('totalTransportationCost').value,
        dateofloading: document.getElementById('dateOfLoading').value,
        startingpoint: document.getElementById('startingPoint').value,
        endingpoint: document.getElementById('endingPoint').value,
      },
    };
    
    // Post data to the invoice API
    axios.post('http://localhost:5000/invoice', dataToSend)
      .then(response => {
        // Handle success
        console.log('Invoice created successfully:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error creating invoice:', error);
      });
  };

  return (
    <div
    style={{
      backgroundImage: `url(${background})`,
      minHeight: '100vh',
    }}
  >
    <h1 className='admin-create-invoice-title'>CREATE INVOICE</h1>
    <div className='admin-create-invoice-container'>
      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>COMPANY DETAILS</h2>
        <select
          className='admin-create-invoice-select'
          onChange={(e) => handleSelectChange(e, setSelectedCompany)}
        >
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.companyname}
            </option>
          ))}
        </select>
      </div>
      {/* Company Details Form */}
<form className='admin-create-invoice-form'>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Id</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companyid}
      onChange={(e) => handleChange(e, 'companydetails', 'companyid')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Name</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companyname}
      onChange={(e) => handleChange(e, 'companydetails', 'companyname')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Registration Type</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companyregistrationtype}
      onChange={(e) => handleChange(e, 'companydetails', 'companyregistrationtype')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company GST No.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companygstno}
      onChange={(e) => handleChange(e, 'companydetails', 'companygstno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Contact</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companycontact}
      onChange={(e) => handleChange(e, 'companydetails', 'companycontact')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Country</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companycountry}
      onChange={(e) => handleChange(e, 'companydetails', 'companycountry')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company State</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companystate}
      onChange={(e) => handleChange(e, 'companydetails', 'companystate')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Office Address</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companyofficeaddress}
      onChange={(e) => handleChange(e, 'companydetails', 'companyofficeaddress')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Company Pincode</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.companydetails.companypincode}
      onChange={(e) => handleChange(e, 'companydetails', 'companypincode')}
    />
  </div>
</form>

      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>SELLER DETAILS</h2>
        <select
          className='admin-create-invoice-select'
          onChange={(e) => handleSelectChange(e, setSelectedSeller)}
        >
          {sellers.map((seller) => (
            <option key={seller._id} value={seller._id}>
              {seller.sellercompanyname}
            </option>
          ))}
        </select>
      </div>
      {/* Seller Details Form */}
<form className='admin-create-invoice-form'>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Seller Id</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.sellerdetails.sellerid}
      onChange={(e) => handleChange(e, 'sellerdetails', 'sellerid')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Seller Company Name</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.sellerdetails.sellercompanyname}
      onChange={(e) => handleChange(e, 'sellerdetails', 'sellercompanyname')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Seller Company GST No.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.sellerdetails.sellercompanygstno}
      onChange={(e) => handleChange(e, 'sellerdetails', 'sellercompanygstno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Seller Company Address</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.sellerdetails.sellercompanyaddress}
      onChange={(e) => handleChange(e, 'sellerdetails', 'sellercompanyaddress')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Seller Company State Name</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.sellerdetails.sellercompanystatename}
      onChange={(e) => handleChange(e, 'sellerdetails', 'sellercompanystatename')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Seller Company State Code</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.sellerdetails.sellercompanystatecode}
      onChange={(e) => handleChange(e, 'sellerdetails', 'sellercompanystatecode')}
    />
  </div>
</form>

      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>BUYER DETAILS</h2>
        <select
          className='admin-create-invoice-select'
          onChange={(e) => handleSelectChange(e, setSelectedBuyer)}
        >
          {buyers.map((buyer) => (
            <option key={buyer._id} value={buyer._id}>
              {buyer.buyercompanyname}
            </option>
          ))}
        </select>
      </div>
      {/* Buyer Details Form */}
<form className='admin-create-invoice-form'>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer Id</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.buyerdetails.buyerid}
      onChange={(e) => handleChange(e, 'buyerdetails', 'buyerid')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer Company Name</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.buyerdetails.buyercompanyname}
      onChange={(e) => handleChange(e, 'buyerdetails', 'buyercompanyname')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer Company GST No.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.buyerdetails.buyercompanygstno}
      onChange={(e) => handleChange(e, 'buyerdetails', 'buyercompanygstno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer Company Address</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.buyerdetails.buyercompanyaddress}
      onChange={(e) => handleChange(e, 'buyerdetails', 'buyercompanyaddress')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer Company State Name</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.buyerdetails.buyercompanystatename}
      onChange={(e) => handleChange(e, 'buyerdetails', 'buyercompanystatename')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer Company State Code</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.buyerdetails.buyercompanystatecode}
      onChange={(e) => handleChange(e, 'buyerdetails', 'buyercompanystatecode')}
    />
  </div>
</form>

      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>VEHICLE DETAILS</h2>
        <select
          className='admin-create-invoice-select'
          onChange={(e) => handleSelectChange(e, setSelectedVehicle)}
        >
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.vechiclenuumber}
            </option>
          ))}
        </select>
      </div>
      {/* Vehicle Details Form */}
<form className='admin-create-invoice-form'>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Vehicle ID</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.vehicleid}
      onChange={(e) => handleChange(e, 'vehicledetails', 'vehicleid')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Driver Name</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.drivername}
      onChange={(e) => handleChange(e, 'vehicledetails', 'drivername')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Driver Number</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.drivernumber}
      onChange={(e) => handleChange(e, 'vehicledetails', 'drivernumber')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Driver Address</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.driveraddress}
      onChange={(e) => handleChange(e, 'vehicledetails', 'driveraddress')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Driver ID Proof</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.driveridproof}
      onChange={(e) => handleChange(e, 'vehicledetails', 'driveridproof')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Driver License No.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.driverlicenseno}
      onChange={(e) => handleChange(e, 'vehicledetails', 'driverlicenseno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Vehicle Number</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.vehiclenumber}
      onChange={(e) => handleChange(e, 'vehicledetails', 'vehiclenumber')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Vehicle Model</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.vehiclemodel}
      onChange={(e) => handleChange(e, 'vehicledetails', 'vehiclemodel')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Vehicle Office Branch</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.vehicledetails.vehicleofficebranch}
      onChange={(e) => handleChange(e, 'vehicledetails', 'vehicleofficebranch')}
    />
  </div>
</form>

      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>CONSIGNMENT DETAILS</h2>
        <select className='admin-create-invoice-select'>
          {consignments.map((consignment, index) => (
            <option key={index} value={consignment._id}>
              {consignment.itemname}
            </option>
          ))}
        </select>
        {/* ... (Your existing JSX code) ... */}
      </div>
      <table className='admin-create-invoice-table-consigment'>
        {/* ... (Your existing JSX code) ... */}
      </table>
      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>INVOICE DETAILS</h2>
        {/* ... (Your existing JSX code) ... */}
      </div>
      {/* Invoice Details Form */}
<form className='admin-create-invoice-form'>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Invoice No.</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.invoiceno}
      onChange={(e) => handleChange(e, 'invoicedetails', 'invoiceno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Invoice Date</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.invoicedate}
      onChange={(e) => handleChange(e, 'invoicedetails', 'invoicedate')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>E Way Bill No</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.ewaybillno}
      onChange={(e) => handleChange(e, 'invoicedetails', 'ewaybillno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Delivery Note</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.deliverynote}
      onChange={(e) => handleChange(e, 'invoicedetails', 'deliverynote')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Supplier Ref.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.supplierref}
      onChange={(e) => handleChange(e, 'invoicedetails', 'supplierref')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Other Ref.</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.otherref}
      onChange={(e) => handleChange(e, 'invoicedetails', 'otherref')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer's Order No.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.buyersorder}
      onChange={(e) => handleChange(e, 'invoicedetails', 'buyersorder')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Buyer's Order Date</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.ordereddate}
      onChange={(e) => handleChange(e, 'invoicedetails', 'ordereddate')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Dispatch Document No.</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.dispatchdocumentno}
      onChange={(e) => handleChange(e, 'invoicedetails', 'dispatchdocumentno')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Delivery Note Date</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.deliverynotedate}
      onChange={(e) => handleChange(e, 'invoicedetails', 'deliverynotedate')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Dispatch Through</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.dispatchthrough}
      onChange={(e) => handleChange(e, 'invoicedetails', 'dispatchthrough')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Destination</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.destination}
      onChange={(e) => handleChange(e, 'invoicedetails', 'destination')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Terms and Conditions</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.invoicedetails.termsandcondition}
      onChange={(e) => handleChange(e, 'invoicedetails', 'termsandcondition')}
    />
  </div>
</form>

      <div className='admin-create-invoice-data'>
        <h2 className='admin-create-invoice-subtitle'>BOARDING DETAILS</h2>
        {/* Boarding Details Form */}
<form className='admin-create-invoice-form'>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Weight of Load</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.boardingdetails.weight}
      onChange={(e) => handleChange(e, 'boardingdetails', 'weight')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Transportation Cost</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.boardingdetails.transportationcost}
      onChange={(e) => handleChange(e, 'boardingdetails', 'transportationcost')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Total Transportation Cost</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.boardingdetails.totalcost}
      onChange={(e) => handleChange(e, 'boardingdetails', 'totalcost')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Date of Loading</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.boardingdetails.dateofloading}
      onChange={(e) => handleChange(e, 'boardingdetails', 'dateofloading')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Starting Point</label>
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.boardingdetails.startingpoint}
      onChange={(e) => handleChange(e, 'boardingdetails', 'startingpoint')}
    />
  </div>
  <div className='admin-create-invoice-form-div'>
    <label className='admin-create-invoice-form-label'>Ending Point</label>
    <br />
    <input
      className='admin-create-invoice-form-input'
      type='text'
      value={dataToSend.boardingdetails.endingpoint}
      onChange={(e) => handleChange(e, 'boardingdetails', 'endingpoint')}
    />
  </div>
</form>
      </div>
      <div className='admin-create-invoice-data-submit'>
        <button className='admin-create-invoice-button' onClick={handleSubmit}>
          CREATE INVOICE
        </button>
      </div>
    </div>
  </div>  
  );
};

export default AdminCreateInvoice;
